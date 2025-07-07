from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
# from django.http import HttpResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# def home(request):
#     return HttpResponse(b"<h2>Welcome to the Job Portal Backend</h2>")

urlpatterns = [
    # path('', home),
    path('admin/', admin.site.urls),
    path('api/', include('jobs.urls')),

    # ✅ JWT Login URLs

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
