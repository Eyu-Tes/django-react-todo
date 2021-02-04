# Serializers used to convert model instances into JSON

from rest_framework import serializers
from .models import Todo


# form - model form
# serializer - model serializer
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'completed']
