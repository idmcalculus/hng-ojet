define([
    "knockout",
    "jquery",
    "./api",
    "ojs/ojarraydataprovider",
    "ojs/ojpagingdataproviderview",
    "ojs/ojmodel",
    "ojs/ojlistview",
    "ojs/ojdialog",
    "ojs/ojvalidation-datetime",
    "ojs/ojtimezonedata",
    "ojs/ojpagingcontrol"
  ], function(ko, $, api, ArrayDataProvider, Paging) {
    function activityModel() {
      let self = this;
      let RESTurl = `${api}/api/posts`;
      let userToken = sessionStorage.getItem("user_token");
  
      self.postSelected = ko.observable();
      self.post = ko.observable({});
      self.dataProvider = ko.observable();
      self.categories = ko.observableArray([]);
      self.category_id = ko.observable();
  
      self.postSelectedChanged = () => {
        let { data } = self.postSelected();
        if (data != null) {
          self.post(data);
          self.viewPostModal(data);
        }
      };

      function fetchActivities() {
        $.ajax({
          url: `${api}/api/activity/admin`,
          headers: {
            Authorization: "Bearer " + " " + userToken
          },
          method: "GET",
          success: res => {
              console.log(res.data)
          }
        });
      }
  
      function fetchCategories() {
        self.categories([]);
        $.ajax({
          url: `${api}/api/categories`,
          headers: {
            Authorization: "Bearer " + " " + userToken
          },
          method: "GET",
          success: res => {
              console
            self.categories(res.data.map(cats => cats));
          }
        });
      }

  
      self.viewPostModal = data => {
        $("#viewModal").attr("title", data.post_title);
        document.getElementById("viewModal").open();
      };
  
      // datetime converter
      self.formatDateTime = date => {
        var formatDateTime = oj.Validation.converterFactory(
          oj.ConverterFactory.CONVERTER_TYPE_DATETIME
        ).createConverter({
          formatType: "datetime",
          dateFormat: "medium",
          timeFormat: "short",
          timeZone: "Africa/Lagos"
        });
  
        return formatDateTime.format(new Date(date).toISOString());
      };
  
      self.search = ko.observable(false);
      self.fetchPost = () => {
        $.ajax({
          url: `${RESTurl}`,
          headers: {
            Authorization: "Bearer " + userToken
          },
          method: "GET",
          success: res => {
            if (res.status == true) {
              let { data } = res.data;
              self.dataProvider(
                new Paging(
                  new ArrayDataProvider(data, {
                    keys: data.map(function(value) {
                      value.created_at = self.formatDateTime(value.created_at);
                      return value.post_title;
                    })
                  })
                )
              );
            }
          }
        });
      };
      self.filterpost = function() {
        self.search(false);
        let catId = self.category_id();
        if (catId == undefined) {
          self.fetchPost();
        } else {
          self.search(true);
          self.posts_under_category(catId);
        }
      };
  
      self.posts_under_category = function(category_id) {
        $.ajax({
          url: `${api}/api/categories/posts/${category_id}`,
          headers: {
            Authorization: "Bearer " + userToken
          },
          method: "GET",
          success: res => {
            let { data } = res.data;
  
            self.dataProvider(
              new Paging(
                new ArrayDataProvider(data, {
                  keys: data.map(function(value) {
                    return value.id;
                  })
                })
              )
            );
          }
        });
      };
  
      fetchCategories();
      self.fetchPost();
      fetchActivities();
      // listen for changes
      let pm = ko.dataFor(document.querySelector("#admin"));
      pm.selectedItem.subscribe(function() {
        if (pm.selectedItem() == "Posts") {
          fetchCategories();
          self.fetchPost();
          fetchActivities();
        }
      });
    }
  
    return new activityModel();
  });
  