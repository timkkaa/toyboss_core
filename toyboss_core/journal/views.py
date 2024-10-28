
from django.shortcuts import render
from django.views.generic import TemplateView
from django.views.generic import TemplateView
from django.shortcuts import get_object_or_404
from journal.models import Category, Publication, Recipe, Product, Contact, About





class CategoryListView(TemplateView):

    def get_context_data(self, **kwargs):
        category_pk = kwargs['pk']
        context = super().get_context_data(**kwargs)
        context['category'] = Category.objects.get(id=category_pk)
        return context


class HomeView(TemplateView):
    template_name = 'index.html'

class ProductView(TemplateView):
    template_name = 'product.html'

    def get_context_data(self, **kwargs):

        context = {
            'products': Product.objects.all()
        }
        return context


class ProductInnerView(TemplateView):
    template_name = 'product-inner.html'

    def get_context_data(self, **kwargs):
        product_pk = kwargs['pk']

        context = {
            'product': Product.objects.get(id=product_pk)
        }
        return context



class PublicationsView(TemplateView):
    template_name = 'publications.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['publications'] = Publication.objects.filter(is_active=True)
        return context


class PublicationsInnerView(TemplateView):
    template_name = 'publications-inner.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        product_id = kwargs.get('pk')
        context['product'] = get_object_or_404(Product, pk=product_id)
        return context

class AboutCompanyView(TemplateView):
    template_name = 'about-company.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['about'] = About.objects.all()
        return context


class ReciponsView(TemplateView):
    template_name = ('recipes.html')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['recipes'] = Recipe.objects.all()
        return context


class ReciponsInnerView(TemplateView):
    template_name = ('recipes-inner.html')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        recipe_id = kwargs.get('pk')
        context['recipe'] = get_object_or_404(Recipe, pk=recipe_id)
        return context

class ContactView(TemplateView):
    template_name = 'contacts.html'



    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['contacts'] = Contact.objects.all()
        return context

