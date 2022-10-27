from rest_framework.serializers import ModelSerializer
from account.models import AccountInfo

class InfoProductSerializer(ModelSerializer):
    class Meta:
        model = AccountInfo
        fields = ('id', 'tig_id', 'username', 'password')