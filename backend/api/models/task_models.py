from django.db import models
from .team_models import Team

class Task(models.Model):
    STATUS_CHOICES = (
        ('planning', '企画中'),
        ('dev_ready', '開発待ち'),
        ('developing', '開発中'),
        ('qa', 'テスト中'),
        ('done', '終了')
    )
    
    title = models.CharField(max_length=50)
    team_in_charge = models.ForeignKey(Team, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='planning'
    )
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    