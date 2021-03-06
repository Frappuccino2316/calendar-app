# Generated by Django 3.1.6 on 2021-02-24 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210219_1741'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='end_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='task',
            name='start_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('planning', '企画中'), ('dev_ready', '開発待ち'), ('developing', '開発中'), ('qa', 'テスト中'), ('done', '終了')], default='planning', max_length=10),
        ),
    ]
