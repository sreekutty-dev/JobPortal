from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Job, Application

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']

class JobSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    applications_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'company', 'location', 'salary', 
                 'requirements', 'created_by', 'created_at', 'is_active', 'applications_count']
        read_only_fields = ['id', 'created_by', 'created_at', 'applications_count']
    
    def get_applications_count(self, obj):
        return obj.applications.count()
    
    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)

class ApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    job_id = serializers.IntegerField(write_only=True)
    candidate = UserSerializer(read_only=True)
    
    class Meta:
        model = Application
        fields = ['id', 'job', 'job_id', 'candidate', 'candidate_name', 'email', 
                 'phone', 'resume', 'cover_letter', 'voice', 'status', 
                 'applied_on', 'updated_on']
        read_only_fields = ['id', 'candidate', 'applied_on', 'updated_on']
    
    def create(self, validated_data):
        job_id = validated_data.pop('job_id')
        validated_data['job_id'] = job_id
        validated_data['candidate'] = self.context['request'].user
        return super().create(validated_data)

class ApplicationStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['status']
