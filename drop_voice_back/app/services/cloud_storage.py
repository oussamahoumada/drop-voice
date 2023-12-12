import os
import dropbox
from dotenv import load_dotenv
from dropbox.exceptions import AuthError

####################
## add to dropbox ##
####################
load_dotenv()

app_key_dropbox = os.getenv('APP_KEY_DROPBOX')
app_secret = os.getenv('APP_SECRET_DROPBOX')
oauth2_refresh_token = os.getenv('REFRESH_TOKEN_DROPBOX')

dbx = dropbox.Dropbox(app_key=app_key_dropbox, app_secret=app_secret, oauth2_refresh_token=oauth2_refresh_token)

def upload_file(file_from, file_to):

    if(file_from!='' and file_to!=''):
        with open(file_from, "rb") as f:
            dbx.files_upload(f.read(), file_to, mute = True)

    else:
        print("empty variable error")

def add_to_dropbox(path, name):
    file_to = '/test/' + name
    upload_file(path, file_to)


######################
## get from dropbox ##
######################

def get_image_url(file_path):
    try:
        shared_link = dbx.sharing_create_shared_link("/test/" + file_path)
        raw_url = shared_link.url.replace('dl=0', 'raw=1')

        return raw_url

    except AuthError as e:
        print("Authentication error:", e)
