# Generated by Django 4.2.7 on 2024-02-29 14:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0005_module_lecturersname'),
    ]

    operations = [
        migrations.RenameField(
            model_name='module',
            old_name='lecturersName',
            new_name='lecturersNames',
        ),
    ]
