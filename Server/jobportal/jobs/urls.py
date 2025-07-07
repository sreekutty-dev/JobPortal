from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, ApplicationViewSet, UserViewSet

router = DefaultRouter()
router.register('jobs', JobViewSet, basename='job')
router.register('applications', ApplicationViewSet, basename='application')
router.register('users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
]
