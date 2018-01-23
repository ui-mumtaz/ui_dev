(function() {

  'use strict';

  angular.module('pb.dashboard').controller('PackageTrackingController',
    function($log, $modal, $stateParams, PackagesResolve, moment) {

      var _this = this;

      _this.packages = PackagesResolve;

      //$log.debug('search term is ', $stateParams.term);
      //$log.debug('status is ', $stateParams.statusIs);

      _this.currentStatus = $stateParams.statusIs;

      //$log.debug('current status', _this.currentStatus);

      _this.statusMenu = [
        {
          label: 'All packages',
          value: ''
        }, {
        label: 'Received',
        value: 'received'
      }, {
        label: 'Delivered',
        value: 'delivered'
      }, {
        label: 'Attempted',
        value: 'attempted'
      }, {
        label: 'Refused',
        value: 'refused'
      }, {
        label: 'Undelivered',
        value: 'undelivered'
      }];

      _this.search = {
        $: $stateParams.term || ''
      };

      _this.statusFilter = {
        group: undefined,
        status: undefined
      };

      //status
      _this.status = {
        dropdownLabel: 'All packages',
        selected: [_this.statusMenu[0]],
        dropdownChange: function(group) {
          _this.status.dropdownLabel = group.label;
          _this.search.status = group.value;
        }
      };

      if ($stateParams.statusIs) {

        angular.forEach(_this.statusMenu, function(value, index) {
          $log.debug(value, index);
          if (value.value === $stateParams.statusIs) {
            _this.status.dropdownChange(value);
          }
        });
      }



      _this.table = {
        daterangepicker: {
          date: {
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month')
          },
          options: {
            singleDatePicker: false,
            opens: 'center',
            ranges: {
              Today: [moment(), moment()],
              'Last 7 Days': [moment().subtract(6, 'days'), moment()],
              'Month to date': [moment().startOf('month'), moment()],
              'Year to date': [moment().startOf('year'), moment()]
            },
            endDate: moment(),
            startDate: moment().subtract(6, 'days'),
            eventHandlers: {
              'apply.daterangepicker': function(ev, picker) {
                _this.table.daterangepicker.displayDate(picker.startDate, picker.endDate);
              }
            }
          },
          displayDate: function(start, end) {

            var startDate = start || _this.table.daterangepicker.date.startDate;
            var endDate = end || _this.table.daterangepicker.date.endDate;

            var dateDiff = endDate.diff(startDate, 'days');
            var result = '';

            if (dateDiff === 0) {
              result = 'Today ' + moment(startDate).format('MM/DD/YYYY');
            } else if (dateDiff === 6) {
              result = 'Last 7 days';
            } else {
              result = 'From ' + moment(startDate).format('MM/DD/YYYY') + ' to ' + moment(endDate).format('MM/DD/YYYY');
            }

            return result;
          }
        }
      };


      //TODO: this filter handles the daterange and should be moved to the core/filters
      //NOTE: may want to change filter name, this handles a single date in the object
      angular.module('pb.dashboard').filter('daterange', function($log, moment) {
        return function(items, start, end) {
          //$log.debug('FROM:', moment(start).unix(), 'TO:', moment(end).unix());

          var dateStart = moment(start).unix();
          var dateEnd = moment(end).unix();

          var result = [];

          angular.forEach(items, function(value, index) {
            //$log.debug(value, index);
            var itemDate = moment(value.date.created).unix();

            if (itemDate > dateStart && itemDate < dateEnd) {
              result.push(value);
            }
          });

          return result;

        };
      });




    });
})();
