from django.contrib import admin
from .models.task_models import Task
from .models.team_models import Team

admin.site.register(Team)
admin.site.register(Task)