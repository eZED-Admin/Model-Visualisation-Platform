![eZED Web Logo](assets/ezed-web-logo.jpeg)

# Model Visualization Platform

#### This repository contains the content for the eZED Model Visualization Web Application.

The HTML content is deployed via GitHub Pages under the "pages" branch.

## Model Upload Notes:

- Currently, the only supported format is an OBJ & MTL pair.
- Any other embedded data within the OBJ file, such as positional data, will also be shown in the visualization.
- Model scale is calculated via the length of the model's bounding box, and the camera height is set to the center of the same bounding box.
- Models can be uploaded via the Upload Assistant desktop application. This assistant can be downloaded from the main branch of this repository.
- The GitHub Pages Servers can take as long as 5 minutes to update.

## Accessing Your Chosen Model:

The required model can be accessed via the QR code generated in the downloads folder or by altering the URL parameters.

##### URL: `https://tannin-h.github.io/Model-Viewer/?model=YOUR-CHOSEN-MODEL`

Replace the fully capitalized field with the text displayed in the part reference field.

**NOTE:** If this field is filled incorrectly (i.e., missing or does not match a model in the database), the application will continuously load.

## Troubleshooting

### Continuous Loading Screen

- If the URL was entered manually, ensure that the model parameter (case & whitespace sensitive) has been filled correctly.
- Verify there is a green tick on the latest deployment of the pages branch. Do this by navigating to the deployments page by selecting it from the sidebar of the home page of the repository. If it is orange, wait and refresh the page till it turns green or a red cross. If there is a cross, select the three dots of the latest deployment under the **Latest deployments from all environments** section and choose **View workflow run**. Then select **Re-run all jobs** in the top right corner.

### Empty Scene

- Move and zoom around the scene to ensure the model is not excessively large, small, or positioned out of frame due to positional data imported from initial modeling.

### Advanced Debugging:

Access the JavaScript console by the methods described [here](https://balsamiq.com/support/faqs/browserconsole/#google-chrome).

If the model has been 100% loaded, then it is most likely in the scene but just not visible. If you can find it in the scene, this can help debug the issue, i.e., too large or small. If not, ensure there is no bounding box / positional data affecting the model and refer / match the scale of other working models.

A 404 error means the model cannot be found. Ensure the steps under Continuous Loading Screen have been followed. In addition, you can check the OBJ and MTL files are stored under the models folder and that your model appears in the models.json file. If not, try uploading the models again. If parts of the upload process have been completed, then you may have to follow the correct steps in the Model Deletion Protocol to either remove the new entry from the JSON file or remove the folder containing the OBJ and MTL file so that the name can be reused.

## Model Deletion Protocol

1. Navigate to the pages branch.
2. Navigate into the directory of the model to be deleted so that you can see both the OBJ and MTL files.
3. Select the three dots next to "add file" and choose **Delete Directory**.
4. Follow the prompts to commit the changes.
5. Open the **models.json** file and select the pencil in the menu bar to edit the file.
6. Remove the dictionary item of the model that needs to be removed. Note the apostrophes after every model except the last.

Before Removing:
```json
{
  "models": {
    "Model1": {
      "obj": "Models/Model1/Model1.obj",
      "mtl": "Models/Model1/Model1.mtl"
    },
    "Model2": {
      "obj": "Models/Model2/Model2.obj",
      "mtl": "Models/Model2/Model2.mtl"
    },
    "Model3": {
      "obj": "Models/Model3/Model3.obj",
      "mtl": "Models/Model3/Model3.mtl"
    }
  }
}

```

After Removing:
```json
{
  "models": {
    "Model1": {
      "obj": "Models/Model1/Model1.obj",
      "mtl": "Models/Model1/Model1.mtl"
    },
    "Model3": {
      "obj": "Models/Model3/Model3.obj",
      "mtl": "Models/Model3/Model3.mtl"
    }
  }
}
```




---

**Copyright © 2024 eZED Ltd. All rights reserved.**

**Property of eZED Ltd.**
