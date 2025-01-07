# Cloudflare Node.js image and video upload

Last updated:
Jul-15-2024

Cloudinary provides an API for uploading images, videos, and any other kind of file to the cloud. Files uploaded to Cloudinary are stored safely in the cloud with secure [backups and revision history](backups_and_version_management). Cloudinary's APIs allow secure uploading from your servers, directly from your visitors' browsers or mobile applications, or fetched via remote public URLs.

Cloudinary's Node.js SDK wraps Cloudinary's upload API and simplifies the integration. Node.js methods are available for easily performing Node.js image and video uploads to the cloud and Node.js helper methods are available for uploading directly from a browser to Cloudinary.

This page covers common usage patterns for Node.js image and video upload with Cloudinary.

For details on all available upload functionality, see the [Upload](upload_images) guide, and the [upload](image_upload_api_reference#upload) method of the Upload API Reference.

Tip

Cloudinary's [Upload widget](upload_widget) provides an alternative to using a Cloudinary SDK to add upload functionality to your application, eliminating the need to develop in-house interactive upload capabilities. The upload widget is an interactive, feature rich, simple-to-integrate user interface that enables you to add Cloudinary upload support to your website. The widget can be easily embedded in your web application with just a few lines of JavaScript code. See the [Upload widget](upload_widget) documentation for detailed information.

[![Upload widget main screen](https://res.cloudinary.com/demo/image/upload/c_scale,w_600/bo_1px_solid_gray/dpr_2.0/f_auto/q_auto/docs/widgets/upload_widget2_big.png)](https://res.cloudinary.com/demo/image/upload/c_scale,w_600/bo_1px_solid_gray/dpr_2.0/f_auto/q_auto/docs/widgets/upload_widget2_big.png)

On this page:

- [Server-side upload](#server_side_upload)
  - [Programmatic upload video tutorial](#programmatic_upload_video_tutorial)
  - [Node.js image upload](#node_js_image_upload)
  - [Node.js upload\_stream](#node_js_upload_stream)
  - [Node.js video upload](#node_js_video_upload)
  - [Upload response](#upload_response)
- [Direct uploading from the browser](#direct_uploading_from_the_browser)

Rate this page:

![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)

## [Server-side upload](\#server_side_upload)

You can upload images, videos, or any other raw file to Cloudinary from your Node.js code. Uploading is done over HTTPS using a secure protocol based on your `api_key` and `api_secret` parameters.

### [Programmatic upload video tutorial](\#programmatic_upload_video_tutorial)

Watch this demo on how to quickly upload images, videos and other media files to Cloudinary for immediate deliverability using Cloudinary's Upload API in your development environment.

![](https://res.cloudinary.com/cloudinary/video/upload/bo_7px_solid_black,c_limit,h_700,w_300/so_3/v1/training/upload-programmatically-tutorial-node-js.jpg)

Video Player is loading.

Play Video

Play

Mute

Current Time 0:00

/

Duration 3:07

Loaded: 25.45%

0:00

Stream Type LIVE

Seek to live, currently behind liveLIVE

Remaining Time -3:07

1x

Playback Rate

- 2x
- 1.5x
- 1.25x
- 1x, selected
- 0.5x

Descriptions

- descriptions off, selected

Captions

- captions off, selected

Audio Track

Fullscreen [Logo link](https://cloudinary.com/)

This is a modal window.

View the code

You can find the code from this tutorial in [GitHub](https://github.com/cloudinary-training/cld-upload-programmatically-node-tutorial).

#### [Tutorial contents](\#tutorial_contents)

You may find these Dev Hints videos useful too:

- [Upload images in Node.js](upload_assets_in_node_tutorial)
- [Upload videos in Node.js](upload_videos_in_node_tutorial)
- [Upload multiple files in Node.js](upload_multiple_assets_in_node_tutorial)

### [Node.js image upload](\#node_js_image_upload)

The following Node.js method uploads an image to the cloud:

Node.js

```
function upload(file, options).then(callback)
```

For example, uploading a local image file named 'my\_image.jpg':

Node.js

```
cloudinary.v2.uploader
  .upload("/home/my_image.jpg")
  .then(result=>console.log(result));
```

The file to upload can be specified as a local path, a remote HTTP or HTTPS URL, a whitelisted storage bucket (S3 or Google Storage) URL, a base64 data URI, or an FTP URL.

Note

The Node SDK uses the dedicated `upload_stream` method for uploading data streams, see below.

For details and code examples of uploading using each of these data source types, see [Required upload parameters](upload_parameters#required_file_parameter).

For details on all available upload functionality, see the [Upload](upload_images) guide, and the [upload](image_upload_api_reference#upload) method of the Upload API Reference.

Tip

If your code is listening for the global event `process.on('unhandledRejection')`, you can disable the Cloudinary internal promises by also including the `disable_promise` parameter set to `true`.

### [Node.js upload\_stream](\#node_js_upload_stream)

The dedicated `upload_stream` SDK method is used to upload a data stream. The method is asynchronous so we recommend wrapping the function in a promise.

For example:

Node.js

```
const byteArrayBuffer = fs.readFileSync('shirt.jpg');
new Promise((resolve) => {
    cloudinary.v2.uploader.upload_stream((error, uploadResult) => {
        return resolve(uploadResult);
    }).end(byteArrayBuffer);
}).then((uploadResult) => {
    console.log(`Buffer upload_stream wth promise success - ${uploadResult.public_id}`);
});
```

Using `await`:

Node.js

```
const byteArrayBuffer = fs.readFileSync('shirt.jpg');
const uploadResult = await new Promise((resolve) => {
    cloudinary.v2.uploader.upload_stream((error, uploadResult) => {
        return resolve(uploadResult);
    }).end(byteArrayBuffer);
});
```

### [Node.js video upload](\#node_js_video_upload)

You upload videos in the same way as images. However, with videos, you must specify the `resource_type` as 'video' within the `upload` method. In addition, the `upload` method supports uploading files only up to 100 MB. To upload larger videos, use the [upload\_large](upload_images#chunked_asset_upload) method, which uploads large files to the cloud in chunks.

The `upload_large` method has the identical signature and options as the `upload` method, with the addition of an optional `chunk_size` parameter (default 20 MB).

The following example uploads `dog.mp4` to Cloudinary and stores it with the public ID `dog_closeup`. It also performs two eager transformations that resize the video to a square and a small rectangle.

Node.js

```
cloudinary.v2.uploader
.upload("dog.mp4",
  { resource_type: "video",
    public_id: "dog_closeup",
    eager: [\
      { width: 300, height: 300, crop: "pad", audio_codec: "none" },\
      { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],
    eager_async: true,
    eager_notification_url: "https://mysite.example.com/notify_endpoint" })
.then(result=>console.log(result));
```

Note

You can also use the `upload_large_stream` method to upload a stream, rather than a file.

### [Upload response](\#upload_response)

By default, uploading is performed synchronously. Once finished, the uploaded image or video is immediately available for transformation and delivery. An upload call returns a Hash with content similar to the following:

Node.js

```
{
  public_id: 'cr4mxeqx5zb8rlakpfkg',
  version: 1571218330,
  signature: '63bfbca643baa9c86b7d2921d776628ac83a1b6e',
  width: 864,
  height: 576,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2017-06-26T19:46:03Z',
  bytes: 120253,
  type: 'upload',
  url: 'http://res.cloudinary.com/demo/image/upload/v1571218330/cr4mxeqx5zb8rlakpfkg.jpg',
  secure_url: 'https://res.cloudinary.com/demo/image/upload/v1571218330/cr4mxeqx5zb8rlakpfkg.jpg'
}
```

The response includes HTTP and HTTPS URLs for accessing the uploaded media asset as well as additional information regarding the uploaded asset: The public ID, resource type, width and height, file format, file size in bytes, a signature for verifying the response and more.

## [Direct uploading from the browser](\#direct_uploading_from_the_browser)

The upload sample mentioned above allows your server-side Node.js code to upload media assets to Cloudinary. In this flow, if you have a web form that allows your users to upload images or videos, the media file's data is first sent to your server and only then uploaded to Cloudinary.

A more efficient and powerful option is to allow your users to upload images and videos in your client-side code directly from the browser to Cloudinary instead of going through your servers. This method allows for faster uploading and a better user experience. It also reduces load from your servers and reduces the complexity of your Node.js applications.

You can upload directly from the browser using signed or unsigned calls to the upload endpoint, as shown in the [Upload multiple files using a form](client_side_uploading#code_explorer_upload_multiple_files_using_a_form_unsigned) examples.

For signed uploads from your client-side code, a [secure signature](authentication_signatures) must be generated in your server-side Node.js code. You can use the `api_sign_request` method to [generate SHA signatures](authentication_signatures#using_cloudinary_backend_sdks_to_generate_sha_authentication_signatures):

Node.js

```
cloudinary.utils.api_sign_request(params_to_sign, api_secret);
```
