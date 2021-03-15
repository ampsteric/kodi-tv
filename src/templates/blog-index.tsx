import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import BlogIndexLayout from "../components/BlogIndexLayout";

export default function BlogIndexPage({ data, pageContext, location }) {
  let frontmatter = { title: "News", breadcrumbs: "News" };
  return (
    <Layout frontmatter={frontmatter}>
      <BlogIndexLayout data={data} pageContext={pageContext} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          excerpt(pruneLength: 300)
          timeToRead
          wordCount {
            words
          }
          fields {
            slug
          }
          frontmatter {
            author
            date(formatString: "MMMM DD, YYYY")
            tags
            featured_image {
              alt
              src
              title
            }
            title
          }
        }
      }
    }
    allTags: allMarkdownRemark {
      distinct(field: frontmatter___tags)
    }
  }
`;
