Question 1:
Hello,

I'm new to search engines, and there are a lot of concepts I'm not educated on. To make my onboarding smoother, it'd help if you could provide me with some definitions of the following concepts:

Records
Indexing
I'm also struggling with understanding what types of metrics would be useful to include in the "Custom Ranking."

Cheers, George

Hi George,
Thank you for reaching out. Please feel free to do the same with any more questions you have.
Records:
If we take the CSV file you sent me. If you open this in your spreadsheet software, a record is the entire row, that represents and item and all its various attributes. In your case, each restaurant, would be represented by a single 'Record'. At Algolia 'Record' and 'Object' can be used interchangeably.
Indexing:
This is when we instruct the system to look through your data and make it easier to return results to your searches. Typically, you will pick particular fields from your records to be indexed. This can save indexing time and will also make searching faster as the system does not have to interpret and index things that people are unlikely to search on. e.g. There is little need to index based on "Object ID" as users are unlikely to enter this as a search term.

You can read more about these terms here:
Record - https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/in-depth/what-is-in-a-record/

Index - https://support.algolia.com/hc/en-us/articles/4406981910289-What-is-an-index-

When it comes to ‘Custom Ranking’, it is wise to get into the shoes of your website guests, and to consider the data you hold on hits vs conversion rates.
In the case of a restaurant search, how likely are people to travel over a certain distance to eat out? Maybe this means we should have ascending location as a ranking.
Maybe there are some restaurants that pay you a fee when you send them customers. Maybe you want to boost those results.
If you wish to learn more about this feature, lets arrange a call.
I’m available:
<times I’m available>

In the meantime, you can learn more here:
https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/
Thanks,
Domanic

Question 2:
Hello,

Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.

Regards, Matt

Hello Matt,
Thanks for reaching out and please continue to do so. The Algolia dashboard is a useful tool for initial set up and small unique tweaks. However, with a development flow like yours, I would recommend you use the API Clients. Because these can be driven from the command line, they can be automated. Meaning that you’ll save a lot of time on navigating the point-and-click interface of the dashboard UI.
More details can be found here:
Delete: https://www.algolia.com/doc/api-reference/api-methods/delete-objects/
Clear: https://www.algolia.com/doc/api-reference/api-methods/clear-objects/

This can save a lot of time when working in an agile environment.

Thanks,
Domanic

Question 3:
Hi,

I'm looking to integrate Algolia in my website. Will this be a lot of development work for me? What's the high-level process look like?

Regards, Leo

Hi Leo,
Thanks for reaching out and please continue to do so.
Implementing Algolia can be extremely easy and quick. It is possible in just 5 minutes, and most users can have a fully functional search running in between 1 and 10 days. Algolia does the heavy lifting in the backend, so most of your work will be aimed at front end presentation of the search and results.
Read more here: https://support.algolia.com/hc/en-us/articles/4406981894033-How-long-does-it-take-to-implement-Algolia-

At a VERY high level, implementing Algolia has 5 steps:

1. Collect data to be indexed
2. Perform any cleansing necessary
3. Upload that data to Algolia
4. Build the interface into your website that will use the index
5. Tune any ranking or customisations to improve search results

Although there can be more to the process, this is the skeleton of what is carried out to get a site using Algolia search.
The APIs we have built, and their accompanying documentation and guides should help keep you on track, and feel free to reach out to me while you assess the solution.

I’ve included a link to a useful Implementation Checklist outline here:
https://www.algolia.com/doc/guides/going-to-production/implementation-checklist/

Thanks,
Domanic
