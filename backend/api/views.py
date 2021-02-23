from rest_framework import generics, mixins, viewsets, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from users.models import Users
from .models import Task, Team
from .serializers.serializers import MyselfSerializer, UserSerializer, TaskSerializer, TeamSerializer
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
        user = self.request.user
        return Team.objects.filter(id=user.team_of_affiliation.id)

class TeamAndTasks(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        user = self.request.user
        
        team = Team.objects.get(id=user.team_of_affiliation.id)
        tasks_queryset = Task.objects.filter(team_in_charge=user.team_of_affiliation.id)
        tasks = [task for task in list(tasks_queryset)]

        team_data = TeamSerializer(team).data
        tasks_data = [TaskSerializer(task).data  for task in tasks]
        
        return Response({
            "team": team_data,
            "tasks": tasks_data
        })
