# Generated by Django 3.1.6 on 2021-03-01 13:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0005_auto_20210301_2153'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicationtoteam',
            name='applicant',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]