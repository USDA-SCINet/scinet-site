---
title: Create an AWS Resource
description: How to create an AWS resource via the service catalog
# author: Jordan Hoosman

categories: [AWS]

subnav:
  - title: Log In
    url: '#log-in'
  - title: AWS Service Catalog Console
    url: '#aws-service-catalog-console'
  - title: Create a Resource
    url: '#create-a-resource---launch-a-product'
    subnav:
      - title: Step 1 - Name and Version
        url: '#step-1-name-and-version'
      - title: Step 2 - Product Parameters
        url: '#step-2-product-parameters'
      - title: Step 3 - TagOptions
        url: '#step-3-tagoptions'
      - title: Steps 4-5 - Notifications and Review
        url: '#steps-4-5-notifications-and-review'
  - title: Provisioned Product Details
    url: '#provisioned-product-details'
  - title: Delete a Resource - Terminate a Product
    url: '#delete-a-resource---terminate-a-product'

---

Guide to creating an AWS resource via the service catalog.

<!--excerpt-->

## Log in

In your web browser, visit [https://shibboleth.scinet.science/](https://shibboleth.scinet.science/) and click the "Amazon Web Services" link. Log in with your SCInet username and password.

![]({{ site.baseurl }}/assets/img/guides/AWS/createresource1.png)
![]({{ site.baseurl }}/assets/img/guides/AWS/createresource2.png)

If you are presented with a role selection screen, choose your desired project to proceed to the console.

## AWS Service Catalog Console


You must be using the **US East (N. Virginia)** region for all AWS activities. **Please check your currently selected region** before following this document's instructions. 
To check and update your region, click on the dropdown in the upper right of the console window, just next to "Support." Select **US East.(N. Virginia)**

![]({{ site.baseurl }}/assets/img/guides/AWS/createresource3.png)


In the main Console page, click on "Service Catalog" within the Management Tools section, or type "ServiceCatalog" into the search bar.

*  You will see all of AWS's service offerings listed on the main page, even though your project role likely restricts your access. Don't get overwhelmed! If you get lost, click the AWS logo in the upper left to get back to the main console.

![]({{ site.baseurl }}/assets/img/guides/AWS/createresource4.png)
![]({{ site.baseurl }}/assets/img/guides/AWS/createresource5.png)

The Service Catalog lists the **products** that have been assigned to your project, as well as the products that have been **provisioned** (launched) provisioned by you or on your behalf.


*  If your Service Catalog console looks different than the one in thescreenshot, you are using the "old look". You can switch to the "newlook" by clicking on the dropdown in the upper left of **Service Catalog** the console and choosing. **Try the new look.** The products assigned to your project may differ from those shown in the screenshot.


## Create a resource - Launch a Product

Click the three-dots button on the desired product card and choose Launch Product, or click on the product name and click Launch Product on thefollowing screen.

![]({{ site.baseurl }}/assets/img/guides/AWS/createresource6.png)
![]({{ site.baseurl }}/assets/img/guides/AWS/createresource7.png)

### Step 1: Name and Version

Provide a name for the product to be launched. This name will be shown in the list of provisioned products, and must contain only letters, numbers, dashes, underscores and periods. Also. select the desired version out of the available versions.

![]({{ site.baseurl }}/assets/img/guides/AWS/createresource8.png)

### Step 2: Product Parameters

Fill in the parameters as made available by the product template definition.


*  Some parameters may have limits or requirements. If you receive a warning message saying 'abcde must equal the value of "Parameter"', copy and paste the value on the left-hand side into the parameter field to proceed through the warning.


![]({{ site.baseurl }}/assets/img/guides/AWS/createresource9.png)
![]({{ site.baseurl }}/assets/img/guides/AWS/createresource10.png)

### Step 3: TagOptions

You may provide optional tags to help you locate and track your resources. For most users, the default tags are sufficient.

![]({{ site.baseurl }}/assets/img/guides/AWS/createresource11.png)

### Steps 4-5: Notifications and Review

Continue through the Notifications screen by clicking Next. Finally, click Launch on the last page to launch the product

![]({{ site.baseurl }}/assets/img/guides/AWS/createresource12.png)
![]({{ site.baseurl }}/assets/img/guides/AWS/createresource13.png)

### Provisioned Product Details

After initially launch, the product details page will show the product as "Under change" with status "In progress". The page will automaticallyupdate (or you can refresh the page if desired). When complete, the product will change to "Available" with status "Succeeded"

![]({{ site.baseurl }}/assets/img/guides/AWS/createresource14.png)
![]({{ site.baseurl }}/assets/img/guides/AWS/createresource15.png)

Follow the instructions in the [AWS Product Documentation](https://confluence.scinet.science/display/SCIN/AWS+Product+Documentation) for more details on how to use the product you just launched.

### Delete a Resource - Terminate a Product

View the list of provisioned products (resources previously launched) by clicking "Provisioned products list" in the Service Catalog console menu(the three bars icon in the upper-left).

![]({{ site.baseurl }}/assets/img/guides/AWS/createresource16.png)
![]({{ site.baseurl }}/assets/img/guides/AWS/createresource17.png)

From the three-dots menu, select "Terminate provisioned product", or choose Terminate from the Actions menu within the Provisioned product details screen.

![]({{ site.baseurl }}/assets/img/guides/AWS/createresource18.png)
![]({{ site.baseurl }}/assets/img/guides/AWS/createresource19.png)

Click "Terminate" to confirm termination of the product. The screen will show "Under change" to show that the product is in process of termination.

![]({{ site.baseurl }}/assets/img/guides/AWS/createresource20.png)
![]({{ site.baseurl }}/assets/img/guides/AWS/createresource21.png)


