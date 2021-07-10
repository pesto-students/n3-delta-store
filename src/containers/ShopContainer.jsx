import {
  Card,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getProducts } from "../main/axios/commerce";
import Filter from "../components/filters";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import ShopCard from "../components/ShopCard";

const ShopContainer = (props) => {
  let params = useParams("categories");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({});

  const getFilteredProducts = (productsData, checkedCategories) => {
    return _.compact(
      _.map(productsData, (prod) => {
        if (prod.categories && prod.categories.length) {
          if (
            _.compact(
              _.map(prod.categories, (selectedCat) => {
                if (
                  _.find(checkedCategories, (checkedCategory) => {
                    return checkedCategory.id === selectedCat.id;
                  })
                ) {
                  return selectedCat;
                }
              })
            ).length
          ) {
            return prod;
          }
        }
      })
    );
  };
  const getCheckedCategories = (filterObj) => {
    return _.compact(
      _.map(filterObj.categories, (categoryFilter) =>
        categoryFilter.checked === true ? categoryFilter : null
      )
    );
  };
  const updateFilter = (filterObj) => {
    setFilters(_.cloneDeep(filterObj));
    const checkedCategories = getCheckedCategories(filterObj);

    if (checkedCategories && checkedCategories.length) {
      setFilteredProducts(getFilteredProducts(products, checkedCategories));
    } else {
      setFilteredProducts(products);
    }
  };

  useEffect(() => {
    if (!(products && products.length)) {
      getProducts().then((res) => {
        setProducts(res.data);
        const categories = _.uniqBy(
          _.flattenDeep(res.data.map((product) => product.categories)),
          "id"
        );
        _.each(categories, (category) => {
          if (params && params.categories) {
            if (_.lowerCase(category.slug) === _.lowerCase(params.categories)) {
              category.checked = true;
            }
          }
        });
        setFilters({ categories });
        setFilteredProducts(
          getFilteredProducts(res.data, getCheckedCategories({ categories }))
        );
      });
    }
  });

  const useStyles = makeStyles((theme) => {
    const cardWidth = 210;
    const cardHeight = 380;
    return {
      cardWidth: {
        width: cardWidth,
        boxShadow: "none",
        minHeight: cardHeight,
        outline: "2px solid #e9e9eb",
        "&:hover": {
          boxShadow: theme.shadows[18],
        },
        cursor: "pointer",
      },
      root: {
        ...theme.page,
        marginTop: theme.spacing(8),
        padding: theme.spacing(4),
        marginBottom: 0,
        [theme.breakpoints.up("sm")]: {
          display: "flex",
          flex: 1,
        },
      },
      media: {
        textAlign: "center",
        height: 270,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      },
      img: {
        ...theme.img,
      },
      producPrice: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: "16px",
        fontWeight: "bold",
        lineHeight: 1,
        color: "#282c3f",
        marginBottom: "6px",
      },
      producName: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: 1,
        color: "#282c3f",
        marginBottom: "6px",
        whiteSpace: "nowrap",
      },
      gridList: {
        margin: theme.spacing(1),
      },
      productGridList: {
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(4),
      },
      gridContainer: {
        [theme.breakpoints.down("md")]: {
          justifyContent: "center",
        },
      },
    };
  });
  const classes = useStyles();
  const productsList =
    filteredProducts && filteredProducts.length ? filteredProducts : products;
  return !(productsList && productsList.length) ? (
    <>
      <div className={classes.root}>
        <div>
          <Skeleton variant="text" />
          <Skeleton animation="wave" />
          <Skeleton variant="rect" width={210} height={210} />
        </div>
        <main>
          <Grid container className={classes.gridContainer}>
            {_.times(20, _.constant(0)).map((product, key) => (
              <Grid key={key} item className={classes.productGridList}>
                <Card className={classes.cardWidth}>
                  <Skeleton variant="rect" className={classes.media} />
                  <Skeleton />
                  <Skeleton width="60%" />
                  <Skeleton width="60%" />
                </Card>
              </Grid>
            ))}
          </Grid>
        </main>
      </div>
    </>
  ) : (
    <>
      <div className={classes.root}>
        <Filter updateFilter={updateFilter} filters={filters}></Filter>
        <main>
          <Grid container className={classes.gridContainer}>
            {productsList.map((product) => (
              <ShopCard product={product} />
            ))}
          </Grid>
        </main>
      </div>
    </>
  );
};
export default ShopContainer;
