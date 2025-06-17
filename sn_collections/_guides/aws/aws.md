-
title: AWS Product Documentation
description: AWS Product Documentation
excerpt: This guide contains the documentation for AWS.
categories: [AWS]

subnav:
  - title: How To Project Monthly Costs For AWS Products
    url: '#how-to-project-monthly-costs-for-aws-products'
  - title: Example EC2 Projected Costs
    url: '#example-ec2-projected-costs'


---

{% include images_path %}





### How To Project Monthly Costs For AWS Products

The following instructions will demonstrate how to calculate the projected monthly cost of an AWS project. In this example, the cost of an EC2 Instance is calculated.

##### Utilized Resources:
* [AWS Console via Oauth Authentication](https://auth.scinet.usda.gov)
* [AWS Simple Monthly Calculator](https://calculator.s3.amazonaws.com/index.html)


1. Navigate to [https://auth.scinet.usda.gov/](https://auth.scinet.usda.gov) and click the link for "AWS Login"  
![]({{ images_path }}/productdocumentation1.png)
2. Authenticate using your SCINet credentials  
![]({{ images_path }}/productdocumentation2.png)
3. Ensure you have the correct region selected "US East (N. Virginia)" in the top right dropdown menu of the AWS console:  
![]({{ images_path }}/productdocumentation3.png)
4. Navigate to the "Services" menu, and select "Managment Tools" > "Service Catalog"  
![]({{ images_path }}/productdocumentation4.png)
5. From the Service Catelog menu select "Products list"  
![]({{ images_path }}/productdocumentation5.png)
6. From here you can selelect the product you wish to calculate the monthly cost for, in this case we'll choose "EC2 Instance"  
![]({{ images_path }}/productdocumentation6.png)
7. Select the latest product version, in this case "0.2.0". You will then see the Service Catalog template in YAML format. This template contains the product configuration options you'll plug into the AWS Simple Monthly Calculator.  
![]({{ images_path }}/productdocumentation7.png)
8. Open a new browser tab to the [AWS Simple Monthly Calculator](https://calculator.s3.amazonaws.com/index.html)
9. Navigate to the applicable product tab in the left hand sidebar the the AWS Simple Monthly calculator  
    *  Uncheck the "FREE USAGE TIER: New Customers get free usage tier for first 12 months" checkbox in the top message banner
![]({{ images_path }}/productdocumentation8.png)
10. Click the "Add New Row" icon under the "Compute: Amazon EC2 Instances".  
    *  Make mental note of the configurable parameters such as "Region", and "Type". For Billing Option you'll always select "On-Demand" and "100" for Usage.
![]({{ images_path }}/productdocumentation9.png)
11. Switch back to the browser tab containing the YAML product template, identify the avaliable options that can be used in the AWS Simple Monthly Calculator. In this case, "InstanceType" and "AWSRegionImageType2AMI" an be used.  
![]({{ images_path }}/productdocumentation10.png)
12. Select the desired Region and Instance Type from the list of allowed options. Let's use t2.large and us-west-1 in this example.
13. Now switch back to the AWS Simple Monthly Calculator and plug in the values, always selecting the Region first since it will clear the calculator table values.  
![]({{ images_path }}/productdocumentation11.png)  
![]({{ images_path }}/productdocumentation12.png)
14. Now enter any additional values or estimations in the form fields below:  
![]({{ images_path }}/productdocumentation13.png)
15. You will now see the projected monthly cost for the applicable product in the "Estimate of your Monthly Bill" tab  
![]({{ images_path }}/productdocumentation14.png)

### Example EC2 Projected Costs
![]({{ images_path }}/productdocumentation15.png)

