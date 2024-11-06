import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";

import axios from "axios";

import { REQUEST_HEADER } from "../../redux/types";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";
import { esGetNumber, getReplaceStr } from "../../utils/formatter/esConverter";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = `https://${ctx.req?.headers?.host}`;

  //products-500-1000-sm.xml

  let size = esGetNumber(ctx.query.size);
  size = size > 0 ? size : 200;
  const siteMaps = [];

  const siteUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;

  const siteMapActionUrl = `${process.env.EXT_BACK_END_URL}/api/sitemap`;
  let productsCount = 0;
  let brandsCount = 0;
  let newsCount = 0;
  let blogCount = 0;

  try {
    const productsResp = await axios.get(siteMapActionUrl, {
      headers: REQUEST_HEADER,
    });

    if (!isEmptyOrNull(productsResp.data.response)) {
      productsCount = productsResp.data.response.products;
      brandsCount = productsResp.data.response.brands;
      newsCount = productsResp.data.response.news;
      blogCount = productsResp.data.response.blogs;
    }

    getSiteMaps(
      siteMaps,
      productsCount,
      `${siteUrl}/server-sitemap/products`,
      size
    );

    getSiteMaps(
      siteMaps,
      brandsCount,
      `${siteUrl}/server-sitemap/brands`,
      size
    );

    getSiteMaps(siteMaps, newsCount, `${siteUrl}/server-sitemap/news`, size);

    getSiteMaps(siteMaps, blogCount, `${siteUrl}/server-sitemap/blogs`, size);
  } catch (error) {
    esBackLogger.info("Products Not Found Site Map ", error);
  }

  return getServerSideSitemap(ctx, siteMaps);
};

// Default export to prevent next.js errors
export default function Sitemap() {}

const getSiteMaps = (
  siteMaps: any[],
  count: number,
  url: string,
  size: number = 200
) => {
  let status = true;
  let idx = 0;
  do {
    if (count > size) {
      if (count >= idx) {
        siteMaps.push({
          loc: `${url}-${idx}-${idx + size}-sm.xml`,
          lastmod: new Date().toISOString(),
          changefreq: "daily",
          priority: 0.9,
        });
        idx = idx + size;
      } else {
        status = false;
      }
    } else {
      siteMaps.push({
        loc: `${url}-${idx}-${idx + size}-sm.xml`,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 0.9,
      });
      status = false;
    }
  } while (status);
};
