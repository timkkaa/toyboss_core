
from django.shortcuts import render
from django.views.generic import TemplateView

from journal.models import Product


class HomeView(TemplateView):
    template_name = 'index.html'

class ProductView(TemplateView):
    template_name = 'product.html'

    def get_context_data(self, **kwargs):
        publication_pk = kwargs['pk']
        context = {
            'product': Product.objects.all
        }
        return context


class ProductInnerView(TemplateView):
    template_name = 'product-inner.html'


class PublicationsView(TemplateView):
    template_name = 'publications.html'

class PublicationsInnerView(TemplateView):
    template_name = 'publications-inner.html'

class AboutCompanyView(TemplateView):
    template_name = 'about-company.html'

class ReciponsView(TemplateView):
    template_name = ('recipes.html')

class ReciponsInnerView(TemplateView):
    template_name = ('recipes-inner.html')

