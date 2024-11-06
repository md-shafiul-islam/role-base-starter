import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";

import axios from "axios";

import { REQUEST_HEADER } from "../../redux/types";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";
import { getReplaceStr } from "../../utils/formatter/esConverter";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = `https://${ctx.req?.headers?.host}`;

  //products-500-1000-sm.xml

  let queryStr = [];
  const siteMaps = [];
  if (typeof ctx.params.param === "string") {
    queryStr = ctx.params.param.split("-");
  }

  const urls = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const backUrl = `${process.env.EXT_BACK_END_URL}/api`;
  let products = [];

  if (queryStr[0] === "products") {
    try {
      const productsResp = await axios.get(
        `${backUrl}/products/sitemap/query/?start=${queryStr[1]}&end=${queryStr[2]}`,
        {
          headers: REQUEST_HEADER,
        }
      );

      if (!isEmptyOrNull(productsResp.data.response)) {
        productsResp.data.response.forEach((item: any) => {
          // addUrlToGoogleIndex(`${urls}/medicines/item.aliasName`);
          if (!isEmptyOrNull(item)) {
            let urlStr = getReplaceStr(item.aliasName, "&", "&amp;");
            urlStr = getReplaceStr(urlStr, "/", "%2F");
            if (!isEmptyOrNull(item.category)) {
              siteMaps.push({
                loc: `${urls}/${item.category.actionUrl}/${urlStr}`,
                lastmod: new Date(item.updateDate).toISOString(),
                changefreq: "daily",
                priority: 0.9,
              });
            } else {
              siteMaps.push({
                loc: `${urls}/mobiles/${urlStr}`,
                lastmod: new Date(item.updateDate).toISOString(),
                changefreq: "daily",
                priority: 0.9,
              });
            }
          }
        });
      }
    } catch (error) {
      esBackLogger.info("Products Not Found Site Map ", error);
    }
  } else if (queryStr[0] === "brands") {
    try {
      const respBrand = await axios.get(`${backUrl}/brands`, {
        headers: REQUEST_HEADER,
      });

      if (!isEmptyOrNull(respBrand.data.response)) {
        respBrand.data.response.forEach((item: any) => {
          // addUrlToGoogleIndex(`${urls}/medicines/item.aliasName`);
          if (!isEmptyOrNull(item)) {
            let urlStr = getReplaceStr(item.name, "&", "&amp;");
            urlStr = getReplaceStr(urlStr, "/", "%2F");
            siteMaps.push({
              loc: `${urls}/brands/${urlStr}`,
              lastmod: new Date().toISOString(),
              changefreq: "daily",
              priority: 0.9,
            });
            siteMaps.push({
              loc: `${urls}/brands/products/${urlStr}`,
              lastmod: new Date().toISOString(),
              changefreq: "daily",
              priority: 0.9,
            });
          }
        });
      }
    } catch (error) {
      esBackLogger.info("Brand Not Found Site Map ", error);
    }
  } else if (queryStr[0] === "news") {
    try {
      const newsResp = await axios.get(
        `${backUrl}/news/sitemap/query/?start=${queryStr[1]}&end=${queryStr[2]}`,
        {
          headers: REQUEST_HEADER,
        }
      );

      if (!isEmptyOrNull(newsResp.data.response)) {
        newsResp.data.response.forEach((item: any) => {
          // addUrlToGoogleIndex(`${urls}/medicines/item.aliasName`);
          if (!isEmptyOrNull(item)) {
            let urlStr = getReplaceStr(item.aliasName, "&", "&amp;");
            urlStr = getReplaceStr(urlStr, "/", "%2F");
            siteMaps.push({
              loc: `${urls}/news/${urlStr}`,
              lastmod: new Date(item.updateDate).toISOString(),
              changefreq: "daily",
              priority: 0.9,
            });
          }
        });
      }
    } catch (error) {
      esBackLogger.info("Products Not Found Site Map ", error);
    }
  } else if (queryStr[0] === "blogs") {
    try {
      const postsResp = await axios.get(
        `${backUrl}/posts/sitemap/query/?start=${queryStr[1]}&end=${queryStr[2]}`,
        {
          headers: REQUEST_HEADER,
        }
      );

      if (!isEmptyOrNull(postsResp.data.response)) {
        postsResp.data.response.forEach((item: any) => {
          // addUrlToGoogleIndex(`${urls}/medicines/item.aliasName`);
          if (!isEmptyOrNull(item)) {
            let urlStr = getReplaceStr(item.aliasName, "&", "&amp;");
            urlStr = getReplaceStr(urlStr, "/", "%2F");
            siteMaps.push({
              loc: `${urls}/blogs/${urlStr}`,
              lastmod: new Date(item.updateDate).toISOString(),
              changefreq: "daily",
              priority: 0.9,
            });
          }
        });
      }
    } catch (error) {
      esBackLogger.info("Products Not Found Site Map ", error);
    }
  }

  return getServerSideSitemap(ctx, siteMaps);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
