from django.contrib import admin
from django.urls import path

#from journal.views import HomeView, ProductView

from django.conf import settings
from django.conf.urls.static import static

from journal.views import HomeView, ProductView, ProductInnerView, PublicationsView, \
    PublicationsInnerView, AboutCompanyView, ReciponsView, ReciponsInnerView



urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', HomeView.as_view(), name='home-url'),
    path('product/', ProductView.as_view(), name='product-url'),
    path('product-inner/<int:pk>/', ProductInnerView.as_view(), name='product-inner-url'),
    path('publications/', PublicationsView.as_view(), name='publication-url'),
    path('publications-inner/<int:pk>/', PublicationsInnerView.as_view(), name='publication-inner-url'),
    path('about/', AboutCompanyView.as_view(), name='about-url'),
    path('recipes/', ReciponsView.as_view(), name='recipes-url'),
    path('recipes-inner/<int:pk>/', ReciponsInnerView.as_view(), name='recipes-inner-url'),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
