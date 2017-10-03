# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0007_auto_20171003_0213'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
