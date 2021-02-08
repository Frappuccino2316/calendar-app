from django.shortcuts import render
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, mixins
from users.models import Users
from .models import Task, Team
from rest_framework import viewsets, generics
from .serializers.serializers import UserSerializer, TaskSerializer, TeamSerializer
from .ownpermissions import ProfilePermission

class UserViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes = (ProfilePermission,)
    

class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    def get_object(self):
        return self.request.user

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    