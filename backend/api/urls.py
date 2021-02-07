from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from api.views import TaskViewSet, TeamViewSet, UserViewSet, ManageUserView

router = routers.DefaultRouter()
router.register('tasks', TaskViewSet)
router.register('teams', TeamViewSet)
router.register('users', UserViewSet)

urlpatterns = [
    path('myself/', ManageUserView.as_view(), name='myself'),
    path('', include(router.urls)),
]
