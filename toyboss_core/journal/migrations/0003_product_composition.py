# Generated by Django 5.1.2 on 2024-10-28 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0002_about_contact_publication_recipe_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='composition',
            field=models.CharField(max_length=250, null=True, verbose_name='состав'),
        ),
    ]
