from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from api.views import TaskViewSet, TeamViewSet, UserViewSet, ManageUserView, TeamAndTasks, TeamAndMembers, ApplicantsViewSet, ApplicantCreateViewSet, MyApplicationViewSet, InvitationCreateAPIView, MyInvitationDeleteAPIView

router = routers.DefaultRouter()
router.register('tasks', TaskViewSet)
router.register('teams', TeamViewSet)
router.register('users', UserViewSet)
router.register('applicants', ApplicantsViewSet)
router.register('applicants_create', ApplicantCreateViewSet)
router.register('my_application', MyApplicationViewSet)

urlpatterns = [
    path('myself/', ManageUserView.as_view(), name='myself'),
    path('team_and_tasks/', TeamAndTasks.as_view(), name='team_and_tasks'),
    path('team_and_members/', TeamAndMembers.as_view(), name='team_and_members'),
    path('invitation_create/', InvitationCreateAPIView.as_view(), name='create_invitation'),
    path('invitation_delete/<pk>/', MyInvitationDeleteAPIView.as_view(), name='delete_invitation'),
    path('', include(router.urls)),
]
