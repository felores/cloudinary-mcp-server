# Cloudflare Node.js SDK

Last updated:
Dec-08-2024

The Cloudinary Node.js SDK provides simple, yet comprehensive image and video upload, transformation, optimization, and delivery capabilities through the [Cloudinary APIs](cloudinary_references#url_and_rest_apis), that you can implement using code that integrates seamlessly with your existing Node.js application.

## [How would you like to learn?](\#how_would_you_like_to_learn)

| Resource | Description |
| --- | --- |
| [Node.js quick start](node_quickstart) | Get up and running in five minutes with a walk through of installation, configuration, upload, management and transformations. |
| [Video tutorials](node_video_tutorials) | Watch tutorials relevant to your use cases, from getting started with the Node.js SDK, to uploading, transforming and analyzing your images and videos. |
| [Sample projects](node_sample_projects) | Explore sample projects to see how to implement Cloudinary functionality such as upload and delivery with transformations. |
| [Cloudinary Node.js SDK GitHub repo](https://github.com/cloudinary/cloudinary_npm) | Explore the source code and see the [CHANGELOG](https://github.com/cloudinary/cloudinary_npm/blob/master/CHANGELOG.md) for details on all new features and fixes from previous versions. |
| [![Cloudinary Academy](https://cloudinary-res.cloudinary.com/image/upload/w_90,f_auto,q_auto,dpr_2/docs/academy-logo-black.png)](https://training.cloudinary.com) | Try the free [Introduction to Cloudinary for Node.js Developers](https://training.cloudinary.com/courses/introduction-for-api-users-developers) online course, where you can learn how to upload, manage, transform and optimize your digital assets. |

Other helpful resources...

On this page:

- [How would you like to learn?](#how_would_you_like_to_learn)
- [Install](#install)
- [Configure](#configure)
  - [Set required configuration parameters](#set_required_configuration_parameters)
  - [Set additional configuration parameters](#set_additional_configuration_parameters)
  - [Configuration video tutorials](#configuration_video_tutorials)
- [Use](#use)
  - [Quick example: File upload](#quick_example_file_upload)
  - [Quick example: Transform and optimize](#quick_example_transform_and_optimize)
  - [Quick example: Get details of a single asset](#quick_example_get_details_of_a_single_asset)
- [Sample projects](#sample_projects)

Rate this page:

![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)

## [Install](\#install)

Cloudinary's Node.js integration library is available as an open-source NPM package. To install the library, run:

```
npm install cloudinary
```

Note

Check that you're using a [supported version](https://github.com/cloudinary/cloudinary_npm#version-support) of Node.js.

## [Configure](\#configure)

Include Cloudinary's Node.js classes in your code:

Node.js

```
const cloudinary = require('cloudinary');
```

Important

The Node.js SDK upload and admin method syntax examples shown throughout this documentation use the **v2** signature. To avoid confusion, all code examples are shown in the format `cloudinary.v2...`.

In your own code, it is recommended to include `v2` of the Node.js classes as follows:

Node.js

```
const cloudinary = require('cloudinary').v2;
```

Alternatively, from within a module, you can use an ES6 import statement:

Node.js

```
import { v2 as cloudinary } from 'cloudinary'
```

Following either of these, your upload and Admin API calls should omit the `.v2` shown in the code examples of this guide.

For example, a simple image upload:

Node.js

```
cloudinary.uploader
  .upload("my_image.jpg")
  .then(result=>console.log(result));
```

### [Set required configuration parameters](\#set_required_configuration_parameters)

You can set the required configuration parameters, `cloud_name`, `api_key` and `api_secret` either using the `CLOUDINARY_URL` environment variable, or using the `config` method in your code.

To define the `CLOUDINARY_URL` environment variable:

1. Copy the **API environment variable** format from the [API Keys](https://console.cloudinary.com/settings/api-keys) page of the Cloudinary Console Settings.
2. Replace `<your_api_key>` and `<your_api_secret>` with your actual values. Your cloud name is already correctly included in the format.

For example:

```
CLOUDINARY_URL=cloudinary://my_key:my_secret@my_cloud_name
```

Note

When using Cloudinary through a PaaS add-on (e.g., Heroku or AppFog), this environment variable is automatically defined in your deployment environment.

Alternatively, you can use the `config` method to set your `cloud_name`, `api_key` and `api_secret`, for example:

Node.js

```
cloudinary.config({
  cloud_name: 'my_cloud_name',
  api_key: 'my_key',
  api_secret: 'my_secret'
});
```

Important

- When writing your own applications, follow your organization's policy on storing secrets and don't expose your API secret.
- If you use a method that involves writing your environment variable to a file (e.g. `dotenv`), the file should be excluded from your version control system, so as not to expose it publicly.

### [Set additional configuration parameters](\#set_additional_configuration_parameters)

In addition to the required configuration parameters, you can define a number of optional [configuration parameters](cloudinary_sdks#configuration_parameters) if relevant.

You can append configuration parameters, for example `upload_prefix` and `secure_distribution`, to the environment variable:

```
CLOUDINARY_URL=cloudinary://my_key:my_secret@my_cloud_name?secure_distribution=mydomain.com&upload_prefix=myprefix.com
```

Or you can use the `config` method in your code, for example:

Node.js

```
cloudinary.config({
  cloud_name: 'my_cloud_name',
  api_key: 'my_key',
  api_secret: 'my_secret',
  secure_distribution: 'mydomain.com',
  upload_prefix: 'myprefix.com'
});
```

Note

By default, URLs generated with this SDK include an appended SDK-usage query parameter. Cloudinary tracks aggregated data from this parameter to improve future SDK versions and no individual data is collected. If needed, you can disable the `urlAnalytics` configuration option. [Learn more](cloudinary_sdks#analytics_config).

### [Configuration video tutorials](\#configuration_video_tutorials)

If you've had trouble with any of the above steps, you may find these video tutorials helpful:

###### Find your credentials

Find your Cloudinary credentials for APIs and SDKs

###### Configure the Node.js SDK

Install and configure the Cloudinary Node.js SDK

See more [Node.js video tutorials](node_video_tutorials).

## [Use](\#use)

Once you've installed and configured the Node.js SDK, you can use it for:

- **Uploading files to your product environment**: You can upload any files, not only images and videos, set your own naming conventions and overwrite policies, moderate and tag your assets on upload, and much more.
- **Transforming and optimizing images and videos**: Keeping your original assets intact in your product environment, you can deliver different versions of your media - different sizes, formats, with effects and overlays, customized for your needs.
- **Managing assets**: Using methods from the Admin and Upload APIs, you can organize your assets, for example, list, rename and delete them, add tags and metadata and use advanced search capabilities.

Capitalization and data type guidelines...

### [Quick example: File upload](\#quick_example_file_upload)

The following Node.js code uploads the `dog.mp4` video using the public\_id, `my_dog`. The video will overwrite the existing `my_dog` video if it exists. When the video upload is complete, the specified notification URL will receive details about the uploaded media asset.

Node.js

```
cloudinary.v2.uploader
.upload("dog.mp4", {
  resource_type: "video",
  public_id: "my_dog",
  overwrite: true,
  notification_url: "https://mysite.example.com/notify_endpoint"})
.then(result=>console.log(result));
```

Learn more about upload

- Read the [Upload guide](upload_images) to learn more about customizing uploads, using upload presets and more.
- See more examples of [image and video upload](node_image_and_video_upload) using the Cloudinary Node.js library.

- Explore the [Upload API reference](image_upload_api_reference) to see all available methods and options.


### [Quick example: Transform and optimize](\#quick_example_transform_and_optimize)

Take a look at the following transformation code and the image it delivers:

Node.js

cloudinary 2.x

```
cloudinary.image("front_face.png", {transformation: [\
  {gravity: "face", height: 150, width: 150, crop: "thumb"},\
  {radius: 20},\
  {effect: "sepia"},\
  {overlay: "cloudinary_icon"},\
  {effect: "brightness:90"},\
  {opacity: 60},\
  {width: 50, crop: "scale"},\
  {flags: "layer_apply", gravity: "south_east", x: 5, y: 5},\
  {angle: 10},\
  {quality: "auto"}\
  ]})
```

[Open In Transformation Builder](https://tx.cloudinary.com/?transformationString=c_thumb%2Cg_face%2Ch_150%2Cw_150%2Fr_20%2Fe_sepia%2Fl_cloudinary_icon%2Fe_brightness%3A90%2Fo_60%2Fc_scale%2Cw_50%2Ffl_layer_apply%2Cg_south_east%2Cx_5%2Cy_5%2Fa_10%2Fq_auto&publicId=front_face)

[![sample transformation](https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_150,w_150/r_20/e_sepia/l_cloudinary_icon/e_brightness:90/o_60/c_scale,w_50/fl_layer_apply,g_south_east,x_5,y_5/a_10/q_auto/front_face.png)](https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_150,w_150/r_20/e_sepia/l_cloudinary_icon/e_brightness:90/o_60/c_scale,w_50/fl_layer_apply,g_south_east,x_5,y_5/a_10/q_auto/front_face.png)

This relatively simple code performs all of the following on the original [front\_face.jpg](https://res.cloudinary.com/demo/image/upload/front_face.jpg) image before delivering it:

- **Convert** and deliver the image in PNG format (the originally uploaded image was a JPG)
- **Crop** to a 150x150 thumbnail using face-detection gravity to automatically determine the location for the crop
- **Round the corners** with a 20 pixel radius
- Apply a **sepia effect**
- **Overlay the Cloudinary logo** on the southeast corner of the image (with a slight offset). The logo is scaled down to a 50 pixel width, with increased brightness and partial transparency (opacity = 60%)
- **Rotate** the resulting image (including the overlay) by 10 degrees
- **Optimize** the image to reduce the size of the image without impacting visual quality.

And here's the URL that would be included in the image tag that's automatically generated from the above code:

URL

```
https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_150,w_150/r_20/e_sepia/l_cloudinary_icon/e_brightness:90/o_60/c_scale,w_50/fl_layer_apply,g_south_east,x_5,y_5/a_10/q_auto/front_face.png
```

In a similar way, you can [transform a video](node_video_manipulation#video_transformation_examples).

Learn more about transformations

- Read the [Transform and customize assets](transformations_intro) guide to learn about the different ways to transform your assets.
- See more examples of [image](node_image_manipulation) and [video](node_video_manipulation) transformations using the Cloudinary Node.js library.

- See all possible transformations in the [Transformation URL API reference](transformation_reference).

### [Quick example: Get details of a single asset](\#quick_example_get_details_of_a_single_asset)

The following Node.js example uses the Admin API [resource](admin_api#get_details_of_a_single_resource_by_public_id) method to return details of the image with public ID `cld-sample`:

Node.js

```
cloudinary.v2.api
  .resource('cld-sample')
  .then(result=>console.log(result));
```

Sample output:

JSON

```
{
  "asset_id": "bf98540caf22ed65775ee0951f4746c9",
  "public_id": "cld-sample",
  "format": "jpg",
  "version": 1719304891,
  "resource_type": "image",
  "type": "upload",
  "created_at": "2024-06-25T08:41:31Z",
  "bytes": 476846,
  "width": 1870,
  "height": 1250,
  "backup": true,
  "asset_folder": "",
  "display_name": "cld-sample",
  "url": "http://res.cloudinary.com/cld-docs/image/upload/v1719304891/cld-sample.jpg",
  "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/v1719304891/cld-sample.jpg",
  "next_cursor": "497b323dcb9883a15a5e6a7cfb75d439e4de1ca882f5cbe8de6a8b322c37bdad",
  "derived": [\
    {\
      "transformation": "c_scale,w_500",\
      "format": "jpg",\
      "bytes": 22871,\
      "id": "ce3d7bf3068809656dc5aa76572535da",\
      "url": "http://res.cloudinary.com/cld-docs/image/upload/c_scale,w_500/v1719304891/cld-sample.jpg",\
      "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/c_scale,w_500/v1719304891/cld-sample.jpg"\
    }\
  ]
}
```

Learn more about managing assets

- Check out the [Manage and analyze assets](asset_management) guide for all the different capabilities.
- Get an overview of [asset management](node_asset_administration) using the Node.js SDK.
- Select the `Node.js` tab in the [Admin API](admin_api) and [Upload API](image_upload_api_reference) references to see example code snippets.

## [Sample projects](\#sample_projects)

Take a look at the [Node.js sample projects](node_sample_projects) page to help you get started integrating Cloudinary into your Node.js application.

Tip

Check out our collection of [Node.js code explorers](code_explorers) too!


