<h1>Growth-Book Configuration Guide for Mac M1 and iOS. <br>
IOS Developer's guide only<br> 
Updated: 1/24/2024</h1>

Welcome, Programmers!

Are you encountering issues while trying to clone the Growth-Book app on your Mac M1? Fret not! This documentation is your go-to resource for cloning any React Native repository, specifically tailored for Mac M1 with iOS. You can rest easy knowing that this guide focuses only on configuring what's inside the folder, leaving your Mac system untouched. If you make a mistake, simply delete the Git repository and re-clone it.


Descriptive Steps for Newbies:

    Open Visual Studio Code:
        Launch Visual Studio Code.

    Open the Growthbook-Mobile Directory:
        Navigate to the Growthbook-Mobile directory.

    Run Yarn Install on the Terminal:
        In the terminal, run yarn install.

    Try Yarn iOS:
        Attempt yarn ios; however, you may encounter an error. No worries; proceed with the following steps.

    Open Terminal in VSCode:
        Open your terminal in VSCode using `^+Shift+``.

    Navigate to Correct Directory:
        After opening the terminal, confirm your directory by typing pwd. You should be in Growthbook-Mobile

    Change to iOS Directory:
        Execute cd ios.

    Run Pod Install:
        Run [pod install]. If successful, green lines will indicate progress. For issues, refer to this link:https://medium.com/@julien-ctx/how-to-clone-build-and-run-a-react-native-app-from-a-github-repository-7ab781e52a14

    Retry Yarn iOS:
        Retry yarn ios. If an error persists, follow the additional steps.

    Navigate to Boost Container Hash:
        If your current directory is Growthbook-Mobile, run [cd ./ios/Pods/boost/boost/container_hash].
    You should type [ls] in your terminal and see the image below after typing cd ./ios/Pods/boost/boost/container_hash
![Alt text](image.png)

    View Directory List:
        Type ls to view your directory list.

    Open Current Directory in Finder:
        Use [open `pwd`] to open the current directory in Finder.
    After using the open command you should see this: 
![Alt text](readmeimgs/container_hash.png)



    Click on hash.hpp:
        Navigate to hash.hpp and click it.

    Modify Line 131:
        Go to line 131 and change unary_function to __unary_function.
        It should look like this:
![Alt text](readmeimgs/unary_picture.png)

    Address Subsequent Error:
        You may encounter another error related to pods.

    Open Pod Xcode File:
        Open the pod Xcode file at Growthbook-Mobile -> ios -> Pods -> Pods.xcodeproj.
![Alt text](readmeimgs/Pods_location.png)

    Configure React-Codegen:
        Scroll down and click on React-Codegen. Under Minimum Deployments, ensure iOS version is set to 12.4. If not, update it. Reference: React Native Issue #34106. https://github.com/facebook/react-native/issues/34106

![Alt text](readmeimgs/react-codegen-pods-view.png)
    
    Retry Yarn iOS:
        Retry yarn ios. If issues persist, follow these steps.

    Return to Growthbook-Mobile Directory:
        Go back to your Growthbook-Mobile directory in the terminal/command line.

    Type Watchman Commands:
        First type: watchman watch-del-all then type: watchman shutdown-server.

    Retry and Contact for Assistance:
        Retry yarn ios and it should start to work. 

If issues persist, feel free to contact bcortes13@csudh.edu for assistance.




<h1>
Configuring Growthbook for Mac M1 - Readme
For Android Developers Guide<br>
Updated: 1/25/2024
</h1>

<h2>Step 1: Set Up React Native Environment</h2>

Follow the React Native documentation for environment setup by visiting this [forum](https://reactnative.dev/docs/environment-setup). Ensure that you choose macOS as the Development OS and Target OS for Android.

Verify your setup by creating a new project named AwesomeProject using the default React template. If successful, you should see the error below and proceed to the next step. If you encounter any errors, resolve them before moving on until you see the error below.
![Alt text](readmeimgs/ErrorAndroidDev.png)


<h2>Step 2: Update build.gradle</h2>

Navigate to the android directory and open the build.gradle file. Ensure that the source code below matches the content inside your own build.gradle. Copy the provided source code exactly into your build.gradle.
![Alt text](readmeimgs/BuildGradleAndroid.png)


<h2>Step 3: create and modify local.properties</h2>
    After this step create a file that is labled as local.properties in the android directory. 
    Then inside local.properties add this line of text
    [sdk.dir = /Users/USERNAME/Library/Android/sdk]
<h2>Step 4: make sure your zprofile looks like this: </h2>
![image](https://github.com/Upsite-cor/READ_ME_Growthbook_config/assets/76449648/4e3312b8-6fec-4765-9013-2f2aca534416)


<h2>Step 4: Run the Project</h2>

Attempt to run your project again. If you encounter any issues, please contact me at bcortes13@csudh.edu for assistance.
