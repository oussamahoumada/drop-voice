import os
import dropbox
from dotenv import load_dotenv
from dropbox.exceptions import AuthError

####################
## add to dropbox ##
####################
dbx = dropbox.Dropbox( app_key = os.getenv('APP_KEY_DROPBOX'), app_secret = os.getenv('APP_SECRET_DROPBOX'), oauth2_refresh_token=os.getenv('REFRESH_TOKEN_DROPBOX'))

def upload_file(access_token, file_from,file_to):
    
    if(file_from!='' and file_to!=''):
        with open(file_from, "rb") as f:
            dbx.files_upload(f.read(), file_to, mute = True)
        print("uploaded")

    else:
        print("empty variable error")

def add_to_dropbox(path, name):
    load_dotenv()
    file_to = '/test/'+name
    print(file_to)
    print(path)
    access_token = os.getenv('DROPBOX_ACCESS_TOKEN')
    print(access_token)
    upload_file(access_token, path, file_to)


######################
## get from dropbox ##
######################

def get_image_url(file_path):
    try:
        shared_link = dbx.sharing_create_shared_link("/test/"+file_path)
        raw_url = shared_link.url.replace('dl=0', 'raw=1')
        return raw_url

    except AuthError as e:
        print("Authentication error:", e)
