import dropbox

####################
## add to dropbox ##
####################

def upload_file(access_token, file_from,file_to):

    dbx = dropbox.Dropbox(access_token)

    if(file_from!='' and file_to!=''):
        with open(file_from, "rb") as f:
            dbx.files_upload(f.read(), file_to, mute = True)
        print("uploaded")

    else:
        print("empty variable error")

def add_to_dropbox(path, name):
    file_to = '/test/'+name
    print(file_to)
    print(path)
    access_token = 'sl.BrT1pr0bsC3MF7e0cfMwsGFWN9Q2LCpuyv6bKvuE-vmBxE1NrW8IFfFJxYTSGgn3dxbD0vPMGW07tzKWlt8dYHWpnMA9N0xEvfUp94oqsmJsOo375NSY46HLW7jUhlzuOx-nttSv0Rhj'
    upload_file(access_token, path, file_to)



######################
## get from dropbox ##
######################

def download_file(access_token, file_from, file_to):
    dbx = dropbox.Dropbox(access_token)

    if file_from != '' and file_to != '':
        try:
            with open(file_to, "wb") as f:
                metadata, res = dbx.files_download(file_from)
                f.write(res.content)
            print("Downloaded")
        except dropbox.exceptions.HttpError as err:
            print(f"Error downloading file: {err}")
    else:
        print("Empty variable error")

def get_from_dropbox(name, destination_path):
    file_from = '/test/' + name
    access_token = 'sl.BrT1pr0bsC3MF7e0cfMwsGFWN9Q2LCpuyv6bKvuE-vmBxE1NrW8IFfFJxYTSGgn3dxbD0vPMGW07tzKWlt8dYHWpnMA9N0xEvfUp94oqsmJsOo375NSY46HLW7jUhlzuOx-nttSv0Rhj'
    download_file(access_token, file_from, destination_path)