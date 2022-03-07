This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TDD tests

To run the TDD tests, please first install the jest globally:

```bash
yarn add -g jest
# or
npm install --global jest
```

After that, you only need to run the jest command in the terminal:

```bash
jest
```

## Planning

The Product Manager wants to implement a new feature called "reply-to-post" (it's a lot like Twitter's These are regular posts that use "@ mentioning" at the beginning to indicate that it is a reply directly to a post. Reply posts should only be shown in a new, secondary feed on the user profile called "Posts and Replies" where all original posts and reply posts are shown. They should not be shown in the homepage feed.

Write down questions you have for the Product Manager about implementation.

-   The number of characters in each response remains the same?
-   Any user can reply to the posts?
-   These replies and posts will be included in the search feature?
-   Will the user be able to tag any user or just the following and followers?

Write about how you would solve this problem in as much detail as possible. Write about all of the changes to database/front-end/api/etc that you envision. You should write down any assumptions you are making from any questions for the Product Manager that you previously mentioned.

-   First, we will need to change the database because we will also show the reply to the posts and this feature wasn't implemented yet. If a user can reply to many posts and the replies can belong to many users, we will have a n to n relationship and the same for the posts. So, we will need to change the database to achieve it.

-   After changing the database, we will need to implement the reply function and make some tests on it by using TDD to ensure that it will work as expected. This change will also create new endpoints and methods in the API.

-   As soon as we finish the tests, we will need to implement the replies after checking all the new methods and functions. So, we will need a design for this, and then we will add this action to each post.

-   Also, other changes to the front-end will be necessary. We will need to replace the Textarea, use an editor, and implement another action to display a list of users when the user type @ inside this Editor.

-   Besides that, we will need to check with the Product Manager if there are other business rules that we need to follow, according to the questions that I made previously.

-   After those changes, we will need to modify the profile page to add a tab or something similar to display the reply-to-post feature and list all the posts and replies on this section.

-   We also need to change the search method to include the reply-to-post.

## Critique

In any project, it is always a challenge to get the code perfectly how you'd want it. Here is what you need to do for this section:

Reflect on this project, and write what you would improve if you had more time.

Write about scaling. If this project were to grow and have many users and posts, which parts do you think would fail first? In a real-life situation, what steps would you take to scale this product? What other types of technology and infrastructure might you need to use?

-   I think that this project is pretty well structured, and it's scalable. However, I would like to use dependency injection to improve the TDD tests and make some UX tests because in the modals, the enter key is not working to submit the form, and it can be fixed to improve the UX. As I'm using NextJS, the performance and the optimization still can be highly improved, and I'm not using cache or technologies like SWR or Apollo. Also, in my opinion, the Context API with the hooks is scalable, but the redux or the Mobx are still an option.

-   However, to be more realistic, to scale this product in a real-life situation, we would need to remove the local storage and build an API, and it would allow us to use others strategies to load the posts and users and make the website faster.

-   Regarding the technologies, it depends on the feature that we will need to implement. For example, I already mentioned the Editor that we can use to replace the Textarea to include new features. We also can use Firebase Notification or OneSignal to notifications. There are also other local databases that we can use, like Realm.
