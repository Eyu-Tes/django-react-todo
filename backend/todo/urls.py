from django.urls import path
from .views import api_overview, todo_list, todo_detail


urlpatterns = [
    path('', api_overview, name='api_overview'),
    path('todos/', todo_list, name='todo_list'),
    path('todos/<int:pk>', todo_detail, name='todo_detail')
]
