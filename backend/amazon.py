import re
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
 
def get_product_summary(url):
    driver = webdriver.Chrome()

    driver.get(url)
    time.sleep(15)
    
    content = driver.find_element(By.XPATH, "/html/body").text

    start = content.find("About this item")
    end = content.find("Report an issue with this product or seller")
    productInformation = content[start : end]

    productInformation = productInformation.replace("See more", "")
    productInformation = productInformation.replace("Show more", "")
    productInformation = productInformation.replace("Show less", "")
    productInformation = productInformation.replace("See less", "")

    start = content.find("Top reviews from the United States")
    end = content.find("See more reviews")
    userReviews = content[start : end]

    pattern = r'Reviewed in the United States on.*?Verified Purchase\n(.*?)(?=\n\d+ people found this helpful|Helpful|Read more|Read less\Z)'
    reviews = re.findall(pattern, userReviews, re.DOTALL)

    top_three_reviews = reviews[:3]
    top_three_reviews = "Top reviews:\n\n" + "\n\n".join(review.strip() for review in top_three_reviews)

    print(top_three_reviews)
    
    productSummary = productInformation + "\n" + top_three_reviews

    driver.close()

    return productSummary