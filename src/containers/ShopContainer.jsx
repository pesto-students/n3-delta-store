import React, { useEffect, useState } from "react";
import { getProducts } from "../main/axios/commerce";
import Filter from "../components/filters";
import _ from "lodash";
import ShopCard from "../components/ShopCard";
import { Card, Grid, makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../main/store/actions/LoadingActions";
import { Skeleton } from "@material-ui/lab";
const ShopContainer = (props) => {
  /**Get categories is present from URL */
  let params = useParams("categories");
  const loader = useSelector((state) => state.loader.loading);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const geoIpData = useSelector((state) => state?.homeReducer?.geoIpData);

  const dispatch = useDispatch();
  /**
   *
   * @param {*} productsData
   * @param {*} checkedCategories
   * @returns Filtered products after filtering
   */
  const getFilteredProducts = (productsData, checkedCategories) => {
    const filteredProducts = _.compact(
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

    return geoIpData.country_code == "IN"
      ? _.sortBy(filteredProducts, (prod) => {
          return prod.price.raw;
        })
      : _.reverse(filteredProducts);
  };
  /**
   *
   * @param {*} filterObj
   * @returns get checked filters present in filter
   */
  const getCheckedCategories = (filterObj) => {
    return _.compact(
      _.map(filterObj.categories, (categoryFilter) =>
        categoryFilter.checked === true ? categoryFilter : null
      )
    );
  };

  /**
   *
   * @param {*} filterObj
   * Update Filter on click
   */
  const updateFilter = (filterObj) => {
    setFilters(_.cloneDeep(filterObj));
    const checkedCategories = getCheckedCategories(filterObj);

    if (checkedCategories && checkedCategories.length) {
      setFilteredProducts(getFilteredProducts(products, checkedCategories));
    } else {
      setFilteredProducts(products);
    }
  };

  /**
   * Get all products on load of shopping page
   */
  useEffect(() => {
    if (!(products && products.length) && !loader) {
      dispatch(setLoader(true));
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
        /* const getAllPrices = _.uniqBy(_.map(res.data, (prod) => prod.price.raw));
                    const minMaxVal = []
                    minMaxVal.push(_.min(getAllPrices))
                    minMaxVal.push(_.max(getAllPrices)) */

        setFilters({ categories /* , price_range: minMaxVal */ });
        setFilteredProducts(
          getFilteredProducts(res.data, getCheckedCategories({ categories }))
        );
        dispatch(setLoader(false));
      });
    }
  }, [products, dispatch, loader, params]);

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
        padding: theme.spacing(2),
        marginTop: theme.spacing(8),
        marginBottom: 0,
        [theme.breakpoints.up("sm")]: {
          padding: theme.spacing(4),
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
      },
      gridList: {
        margin: theme.spacing(1),
      },
      productGridList: {
        //margin: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(4),
      },
      gridContainer: {
        paddingLeft: theme.spacing(4),
        [theme.breakpoints.down("md")]: {
          paddingLeft: theme.spacing(0),
          justifyContent: "center",
          paddingTop: theme.spacing(4),
        },
      },
      skeleton: {
        width: "240px",
        height: "210px",
        [theme.breakpoints.down("sm")]: {
          width: "auto",
        },
      },
    };
  });
  const classes = useStyles();
  /**
   * Skeleton when products are loading
   */
  const productsList =
    filteredProducts && filteredProducts.length ? filteredProducts : products;
  return !(productsList && productsList.length) ? (
    <>
      <div className={classes.root}>
        <div>
          <Skeleton variant="text" />
          <Skeleton animation="wave" />
          <Skeleton variant="rect" className={classes.skeleton} />
        </div>
        <main>
          <Grid container spacing={2} className={classes.gridContainer}>
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
          <Grid container spacing={2} className={classes.gridContainer}>
            {productsList.map((product) => (
              <ShopCard
                key={product.id}
                product={product}
                className={classes.productGridList}
              />
            ))}
          </Grid>
        </main>
      </div>
    </>
  );
};
export default ShopContainer;
