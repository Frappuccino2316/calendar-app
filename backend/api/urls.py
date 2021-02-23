from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from api.views import TaskViewSet, TeamViewSet, UserViewSet, ManageUserView, TeamAndTasks

router = routers.DefaultRouter()
router.register('tasks', TaskViewSet)
router.register('teams', TeamViewSet)
router.register('users', UserViewSet)

urlpatterns = [
    path('myself/', ManageUserView.as_view(), name='myself'),
    path('team_and_tasks/', TeamAndTasks.as_view(), name='team_and_tasks'),
    path('', include(router.urls)),
]
