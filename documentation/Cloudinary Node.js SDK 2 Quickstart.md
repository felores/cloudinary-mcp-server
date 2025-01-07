# Cloudflare Node.js Quickstart

Last updated:
Nov-25-2024

This quick start lets you get an end-to-end implementation up and running using the Node.js SDK in 5 minutes or less.

On this page:

- [Prerequisites](https://cloudinary.com/documentation/node_quickstart#prerequisites)
- [1\. Set up and configure the SDK](https://cloudinary.com/documentation/node_quickstart#1_set_up_and_configure_the_sdk)
  - [Install the SDK](https://cloudinary.com/documentation/node_quickstart#install_the_sdk)
  - [Set your API environment variable](https://cloudinary.com/documentation/node_quickstart#set_your_api_environment_variable)
  - [Configure Cloudinary](https://cloudinary.com/documentation/node_quickstart#configure_cloudinary)
- [2\. Upload an image](https://cloudinary.com/documentation/node_quickstart#2_upload_an_image)
- [3\. Get and use details of the image](https://cloudinary.com/documentation/node_quickstart#3_get_and_use_details_of_the_image)
- [4\. Transform the image](https://cloudinary.com/documentation/node_quickstart#4_transform_the_image)
- [5\. Run your code](https://cloudinary.com/documentation/node_quickstart#5_run_your_code)
- [View the completed code](https://cloudinary.com/documentation/node_quickstart#view_the_completed_code)
  - [Code explorer: Full Node.js example](https://cloudinary.com/documentation/node_quickstart#code_explorer_full_node_js_example)
- [Next steps](https://cloudinary.com/documentation/node_quickstart#next_steps)

Rate this page:

![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)![](<Base64-Image-Removed>)

#### [Prerequisites](https://cloudinary.com/documentation/node_quickstart\#prerequisites)

Tip

To start with full example apps, see [Node.js sample projects](https://cloudinary.com/documentation/node_sample_projects).

## [1\. Set up and configure the SDK](https://cloudinary.com/documentation/node_quickstart\#1_set_up_and_configure_the_sdk)

### [Install the SDK](https://cloudinary.com/documentation/node_quickstart\#install_the_sdk)

In a terminal in your Node.js environment, run:

```
npm install cloudinary
```

### [Set your API environment variable](https://cloudinary.com/documentation/node_quickstart\#set_your_api_environment_variable)

In a terminal, set your `CLOUDINARY_URL` environment variable.

Copy the **API environment variable** format from the [API Keys](https://console.cloudinary.com/settings/api-keys) page of the Cloudinary Console Settings. Replace `<your_api_key>` and `<your_api_secret>` with your actual values. Your cloud name is already correctly included in the format.

- On Mac or Linux:





















```
export CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
```

- On Windows:





















```
set CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
```


Important

- When writing your own applications, follow your organization's policy on storing secrets and don't expose your API secret.
- If you use a method that involves writing your environment variable to a file (e.g. `dotenv`), the file should be excluded from your version control system, so as not to expose it publicly.

### [Configure Cloudinary](https://cloudinary.com/documentation/node_quickstart\#configure_cloudinary)

Create a new file called **index.js** and copy and paste the following into this file:

index.js

Node.js

```
// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true
});

// Log the configuration
console.log(cloudinary.config());
```

[More info about configuration...](https://cloudinary.com/documentation/node_quickstart#)

## [2\. Upload an image](https://cloudinary.com/documentation/node_quickstart\#2_upload_an_image)

Copy and paste this into **index.js**:

index.js (continued)

Node.js

```
/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};
```

[More info about upload...](https://cloudinary.com/documentation/node_quickstart#)

## [3\. Get and use details of the image](https://cloudinary.com/documentation/node_quickstart\#3_get_and_use_details_of_the_image)

Copy and paste this into **index.js**:

index.js (continued)

Node.js

```
/////////////////////////////////////
// Gets details of an uploaded image
/////////////////////////////////////
const getAssetInfo = async (publicId) => {

    // Return colors in the response
    const options = {
      colors: true,
    };

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        console.log(result);
        return result.colors;
        } catch (error) {
        console.error(error);
    }
};
```

[More info about getting details of an asset...](https://cloudinary.com/documentation/node_quickstart#)

## [4\. Transform the image](https://cloudinary.com/documentation/node_quickstart\#4_transform_the_image)

Copy and paste this into **index.js**:

index.js (continued)

Node.js

```
//////////////////////////////////////////////////////////////
// Creates an HTML image tag with a transformation that
// results in a circular thumbnail crop of the image
// focused on the faces, applying an outline of the
// first color, and setting a background of the second color.
//////////////////////////////////////////////////////////////
const createImageTag = (publicId, ...colors) => {

    // Set the effect color and background color
    const [effectColor, backgroundColor] = colors;

    // Create an image tag with transformations applied to the src URL
    let imageTag = cloudinary.image(publicId, {
      transformation: [\
        { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },\
        { radius: 'max' },\
        { effect: 'outline:10', color: effectColor },\
        { background: backgroundColor },\
      ],
    });

    return imageTag;
};
```

[More info about transformations...](https://cloudinary.com/documentation/node_quickstart#)

## [5\. Run your code](https://cloudinary.com/documentation/node_quickstart\#5_run_your_code)

Copy and paste this into **index.js** to call the functions you just created:

index.js (continued)

Node.js

```
//////////////////
//
// Main function
//
//////////////////
(async () => {

    // Set the image to upload
    const imagePath = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';

    // Upload the image
    const publicId = await uploadImage(imagePath);

    // Get the colors in the image
    const colors = await getAssetInfo(publicId);

    // Create an image tag, using two of the colors in a transformation
    const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);

    // Log the image tag to the console
    console.log(imageTag);

})();
```

Save your changes then run the script from the terminal:

```
node index.js
```

[Check the configuration...](https://cloudinary.com/documentation/node_quickstart#)

[Check the upload response...](https://cloudinary.com/documentation/node_quickstart#)

You can see the image that has been uploaded to your Cloudinary storage by copying the `secure_url` that is returned in the upload response and pasting it in a browser.

URL

```
https://res.cloudinary.com/demo/image/upload/v1651585298/happy_people.jpg
```

[![Happy people image](https://res.cloudinary.com/demo/image/upload/c_scale,h_266/happy_people.jpg)](https://res.cloudinary.com/demo/image/upload/v1651585298/happy_people.jpg)

[Check the resource response...](https://cloudinary.com/documentation/node_quickstart#)

[Check the image tag...](https://cloudinary.com/documentation/node_quickstart#)

You can use the returned image tag to display the image on your website. For now, copy and paste the URL to see the transformed image in the browser:

URL

```
https://res.cloudinary.com/demo/image/upload/c_thumb,g_faces,h_250,w_250/r_max/co_rgb:F8F3F0,e_outline:10/b_rgb:DBE0EA/happy_people
```

[![Transformed image of faces](https://res.cloudinary.com/demo/image/upload/c_thumb,g_faces,h_250,w_250/r_max/co_rgb:F8F3F0,e_outline:10/b_rgb:DBE0EA/happy_people)](https://res.cloudinary.com/demo/image/upload/c_thumb,g_faces,h_250,w_250/r_max/co_rgb:F8F3F0,e_outline:10/b_rgb:DBE0EA/happy_people)

## [View the completed code](https://cloudinary.com/documentation/node_quickstart\#view_the_completed_code)

You can see the whole Node.js script in [GitHub](https://github.com/cloudinary-devs/cld-node-sdk-quick-start), and also in the code explorer below.

### [Code explorer: Full Node.js example](https://cloudinary.com/documentation/node_quickstart\#code_explorer_full_node_js_example)


