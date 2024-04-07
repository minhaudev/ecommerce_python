
from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender ,instance, **kwargs):
    user = instance
    if user.email != "":
        user.username = user.email
#pre_save.connect(updateUser, sender=User): Đây là nơi bạn kết nối hàm xử lý updateUser với tín hiệu pre_save của model User. Điều này có nghĩa là mỗi khi một đối tượng User được lưu vào cơ sở dữ liệu, trước khi lưu nó, hàm updateUser sẽ được gọi và cập nhật username của người dùng dựa trên email.
pre_save.connect(updateUser, sender=User)