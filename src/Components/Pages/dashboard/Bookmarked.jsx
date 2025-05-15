import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeBookmark, getBookmarks } from "../../../util/dashboard";
import PlanCard from "../../Common/PlanCard";
import PlanCardSkeleton from "../../Common/PlanCardSkeleton";
import { Box, Grid, Button, Typography } from "@mui/material";
import AlertDialog from "../../Common/AlertDialog";
import { useAuth } from "../../../context/AuthContext";
import { getQueryValue } from "../../../util/url";
import Pagination from "../../Common/Pagination";

const PAGE_SIZE = 9;

function Bookmarked() {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedPlanToRemove, setSelectedPlanToRemove] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();
  let page = getQueryValue(location.search, "page") || "1";
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    page = getQueryValue(location.search, "page") || "1";
  }, [location.search]);

  useEffect(() => {
    // FIXME: Instead of just redirecting user to home, show a not authorized message with login button or redirect to login page
    if (!token) return navigate("/");

    (async () => {
      setIsLoading(true);
      const params = new URLSearchParams(location.search);
      params.set("page", page);
      params.set("size", PAGE_SIZE);
      const paramsString = params.toString();

      const data = await getBookmarks(paramsString, token, setError);
      if (!data) return setIsLoading(false);

      setPlans(data.items || []);
      setPagesCount(data.pagesCount || 0);
      setIsLoading(false);
    })();
  }, [page]);

  const handleRemovePlan = async () => {
    const result = await removeBookmark(token, selectedPlanToRemove, setError);

    if (!result) return;

    // Filter out the removed plan from the state
    setPlans(plans.filter((plan) => plan._id !== selectedPlanToRemove));
    setSelectedPlanToRemove(null);
    setAlertOpen(false);
  };

  const openDeleteDialog = (planId) => {
    setSelectedPlanToRemove(planId);
    setAlertOpen(true);
  };

  const handleClose = () => {
    setAlertOpen(false);
  };

  if (!isLoading && !plans.length)
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h5" color="textSecondary">
          Bookmarked Plans!
        </Typography>
      </Box>
    );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4">Bookmarked Plans</Typography>
      </Box>

      {!isLoading && error && <p>{error}</p>}
      <Grid container spacing={3}>
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <PlanCardSkeleton />
            </Grid>
          ))}
        {!isLoading &&
          plans.map((plan) => {
            return (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={plan._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <PlanCard
                  image={plan.images[0]}
                  title={plan.title}
                  rate={plan.rate}
                  type={plan.type}
                  distance={plan.distance}
                  stopCount={plan.stopCount}
                  planId={plan._id}
                  isBookmarked={true}
                  showBookmarkBtn={false}
                />
                <Box>
                  <Button
                    onClick={() => openDeleteDialog(plan._id)}
                    style={{ backgroundColor: "#f44336", color: "white" }}
                    sx={{ marginLeft: 1, marginTop: 1 }}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            );
          })}
      </Grid>
      <Pagination page={Number(page)} pagesCount={pagesCount} />
      <AlertDialog
        isOpen={alertOpen}
        onClose={handleClose}
        title="Removing Bookmarked Plan"
        message="Are you sure you want to remove this plan?"
        onConfirm={handleRemovePlan}
        confirmText="Remove"
        cancelText="Cancel"
      />
    </>
  );
}

export default Bookmarked;
