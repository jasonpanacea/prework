# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('content', models.TextField(max_length=200)),
                ('status', models.IntegerField(default=0)),
                ('priority', models.IntegerField(default=0)),
                ('expire_date', models.DateField(blank=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
