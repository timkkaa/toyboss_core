from django.contrib import admin
from journal.models import Publication, Product, Category, Recipe, Contact, About
#from .models import Publication, Product, Category, Recipe, Contact, About
@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ['title']
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name']
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ['name']
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['phone_number', 'facebook', 'instagram']
@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ['description']