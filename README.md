# Basic Integration Example for AppsFlyer's Smart Banners and Scripts
Not changing any part of the code snippets provided by AppsFlyer's and, yet, trying to control as much as possible
when they're called and how much globally impacted the page variables/properties get from them.

## Details:
- Smart Banners can't be encapsulated that easy, it relies on a requests that, in order to properly render it, consumes a lot of data set in window.AF by the 3rd party code snippet shared by AppsFlyer during the integration.

- Smart Scripts are encapuslated, so only required method for this impl. or its constructor can be accessed by importing it.
    - The constructor (config obj for setting up the script), once imported, can be changed inside that given context. This is tested in this excerpt of [index.js](./index.js) file below:
        ```js
        // (...)
        // Importing config object (constructorArgs) with default values
        const { constructorArgs, generateNewOneLinkURL } = await AFScript();

        const result = generateNewOneLinkURL();
        console.log('\n\nDefault Values.\nContructor:', constructorArgs, '\nResult:', result.clickURL);
        console.table(getVisualParams(result.clickURL));
        
        // Changing constructorArgs values below (the actual media source considered)
        constructorArgs.afParameters.mediaSource.defaultValue = 'joao_new_media_source_for_smart_script';
        const newResult = generateNewOneLinkURL();
        console.log('\n\nNew Values.\nContructor:', constructorArgs, '\nResult:', newResult.clickURL);
        console.table(getVisualParams(newResult.clickURL));
        // (...)
        ```
    - Yet, this is not the perfect scenario, if someone remove some of the parameters by, for example, wrongly overwritting it (e.g: `constructorArgs.afParameters.mediaSource = 'media_source_name'`), this can break the setup for generating the Onelink URL. Anyway, in a real project this is easily handled only by using TypeScript, for example. For this example purpose, I achieved what I want and called it a day.