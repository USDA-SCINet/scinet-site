---
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


### How To Project Monthly Costs For AWS Products

The following instructions will demonstrate how to calculate the projected monthly cost of an AWS project. In this example, the cost of an EC2 Instance is calculated.

##### Utilized Resources:
* [AWS Console via Oauth Authentication](https://auth.scinet.usda.gov)
* [AWS Simple Monthly Calculator](https://calculator.s3.amazonaws.com/index.html)


1. Navigate to [https://auth.scinet.usda.gov/](https://auth.scinet.usda.gov) and click the link for "AWS Login"  
![]({{ site.baseurl }}/assets/img/guides/AWS/productdocumentation1.png)
2. Authenticate using your SciNet credentials  
![]({{ site.baseurl }}/assets/img/guides/AWS/productdocumentation2.png)
3. Ensure you have the correct region selected "US East (N. Virginia)" in the top right dropdown menu of the AWS console:  
![]({{ site.baseurl }}/assets/img/guides/AWS/productdocumentation3.png)
4. Navigate to the "Services" menu, and select "Managment Tools" > "Service Catalog"  
![]({{ site.baseurl }}/assets/img/guides/AWS/productdocumentation4.png)
5. From the Service Catelog menu select "Products list"  
![]({{ site.baseurl }}/assets/img/guides/AWS/productdocumentation5.png)
6. From here you can selelect the product you wish to calculate the monthly cost for, in this case we'll choose "EC2 Instance"  
![]({{ site.baseurl }}/assets/img/guides/AWS/productdocumentation6.png)
7. Select the latest product version, in this case "0.2.0". You will then see the Service Catalog template in YAML format. This template contains the product configuration options you'll plug into the AWS Simple Monthly Calculator.  
![]({{ site.baseurl }}/assets/img/guides/AWS/productdocumentation7.png)
8. Open a new browser tab to the [AWS Simple Monthly Calculator](https://calculator.s3.amazonaws.com/index.html)
9. Navigate to the applicable product tab in the left hand sidebar the the AWS Simple Monthly calculator  
    *  Uncheck the "FREE USAGE TIER: New Customers get free usage tier for first 12 months" checkbox in the top message banner
![]({{ site.baseurl }}/assets/img/guides/AWS/productdocumentation8.png)
10. Click the "Add New Row" icon under the "Compute: Amazon EC2 Instances".  
    *  Make mental note of the configurable parameters such as "Region", and "Type". For Billing Option you'll always select "On-Demand" and "100" for Usage.
![]({{ site.baseurl }}/assets/img/guides/AWS/productdocumentation9.png)
11. Switch back to the browser tab containing the YAML product template, identify the avaliable options that can be used in the AWS Simple Monthly Calculator. In this case, "InstanceType" and "AWSRegionImageType2AMI" an be used.  
![]({{ site.baseurl }}/assets/img/guides/AWS/productdocumentation10.png)
12. Select the desired Region and Instance Type from the list of allowed options. Let's use t2.large and us-west-1 in this example.
13. Now switch back to the AWS Simple Monthly Calculator and plug in the values, always selecting the Region first since it will clear the calculator table values.  
![]({{ site.baseurl }}/assets/img/guides/AWS/productdocumentation11.png)  
![]({{ site.baseurl }}/assets/img/guides/AWS/productdocumentation12.png)
14. Now enter any additional values or estimations in the form fields below:  
![]({{ site.baseurl }}/assets/img/guides/AWS/productdocumentation13.png)
15. You will now see the projected monthly cost for the applicable product in the "Estimate of your Monthly Bill" tab  
![]({{ site.baseurl }}/assets/img/guides/AWS/productdocumentation14.png)

### Example EC2 Projected Costs
![]({{ site.baseurl }}/assets/img/guides/AWS/productdocumentation15.png)

