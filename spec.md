app serves four pages

: upload.html (route /)
this page is the home page for the app, it has a title, an upload box, and a link to the source / issue tracker

it tells the user (gets from the app)
- the max upload size
- the file lifespan (if enabled)
- the allowed MIME types for upload
- the description

provides webmaster contact information at the bottom of the page 

if the file is too big / disallowed filetype then append an error to the DOM

: download.html ( route {file.uuid} )

this page serves a file at a uuid. it relies on the browser to embed the file for download. 
it also has a report button for DMCA violations / illegal content

shows the user
- the file name
- time until file expires (if fileExpiration is on)

: banned.html (route /banned)

served through the /upload post route if the IP address is on the denylist (redirect to /banned). literally just tell the user that they are banned

: report.html (route report/{file.uuid} }

simple HTML form that asks for the reportee's email and asks for a description of the violating content (infringes copyright, is CSAM)



needed partials:

layout - base site layout
header - site header
footer - site footer

needed pages:

upload - homepage
download
report 
banned





























