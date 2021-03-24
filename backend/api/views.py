from rest_framework import generics, mixins, viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from users.models import Users
from .models.task_models import Task
from .models.team_models import Team
from .models.application_models import ApplicationToTeam
from .serializers.serializers import MyselfSerializer, UserSerializer, TaskSerializer, TeamSerializer
from .serializers.application_serializers import ApplicationToTeamSerializer, ApplicationToTeamCreateSerializer
from .serializers.invitation_create_serializer import InvitationCreateSerializer
from .ownpermissions import ProfilePermission

class UserViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes = (ProfilePermission,)
    

class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = MyselfSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get_object(self):
        return self.request.user

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(team_in_charge=user.team_of_affiliation.id)
    
class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        if self.request.method == 'GET':
            return Team.objects.all()
        user = self.request.user
        return Team.objects.filter(id=user.team_of_affiliation.id)

class TeamAndTasks(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        user = self.request.user
        
        team = Team.objects.get(id=user.team_of_affiliation.id)
        team_data = TeamSerializer(team).data
        
        tasks_queryset = Task.objects.filter(team_in_charge=user.team_of_affiliation.id)
        tasks_data = [TaskSerializer(task).data  for task in list(tasks_queryset)]
        
        return Response({
            "team": team_data,
            "tasks": tasks_data
        })

class TeamAndMembers(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        user = self.request.user
        
        if user.team_of_affiliation == None:
            return Response({})
        
        team = Team.objects.get(id=user.team_of_affiliation.id)
        team_data = TeamSerializer(team).data
        
        members_queryset = Users.objects.filter(team_of_affiliation=team.id)
        members_data = [UserSerializer(member).data  for member in list(members_queryset)]
        
        return Response({
            "team": team_data,
            "members": members_data
        })

class ApplicantsViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = ApplicationToTeam.objects.all()
    serializer_class = ApplicationToTeamSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        user = self.request.user
        return ApplicationToTeam.objects.filter(application_team=user.team_of_affiliation)

class ApplicantCreateViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ApplicationToTeam.objects.all()
    serializer_class = ApplicationToTeamCreateSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        user = self.request.user
        return ApplicationToTeam.objects.filter(application_team=user.team_of_affiliation)

class MyApplicationViewSet(mixins.RetrieveModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = ApplicationToTeam.objects.all()
    serializer_class = ApplicationToTeamSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        user = self.request.user
        return ApplicationToTeam.objects.filter(applicant=user.id)

class InvitationCreateViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ApplicationToTeam.objects.all()
    serializer_class = InvitationCreateSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        user = self.request.user
        return ApplicationToTeam.objects.filter(application_team=user.team_of_affiliation)

class InvitationCreateAPIView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def post(self, request):
        user_team = self.request.user.team_of_affiliation
        email = request.data['email']
        applicant = Users.objects.get(email=email)
        
        invitation = {
            'applicant': applicant.id,
            'application_team': user_team.id,
        }
        invitation_serializer = InvitationCreateSerializer(data=invitation)
        invitation_serializer.is_valid()
        invitation_serializer.save()
        
        return Response(invitation_serializer.data, status=status.HTTP_201_CREATED)

class MyInvitationDeleteAPIView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get_object(self, pk):
        try:
            return ApplicationToTeam.objects.get(pk=pk)
        except :
            raise Http404
    
    def delete(self, request, pk, format=None):
        invitation = self.get_object(pk)
        if invitation.applicant == self.request.user:
            invitation.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)
