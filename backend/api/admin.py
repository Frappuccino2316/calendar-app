from django.contrib import admin
from .models.task_models import Task
from .models.team_models import Team
from .models.application_models import ApplicationToTeam

admin.site.register(Team)
admin.site.register(Task)
admin.site.register(ApplicationToTeam)