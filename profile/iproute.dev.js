module.exports = function(Formatter) {

function IpRouteDevUpFormatter() {
  Formatter.apply(this, arguments);
}
$inherit(IpRouteDevUpFormatter, Formatter, {
  header: '#!/bin/sh\nip -b - <<FILE\n',
  footer: 'FILE\n',
  ruleFormat: 'r a %prefix/%length dev %gw\n'
});

function IpRouteDevDownFormatter() {
  Formatter.apply(this, arguments);
}
$inherit(IpRouteDevDownFormatter, IpRouteDevUpFormatter, {
  ruleFormat: 'r d %prefix/%length dev %gw\n'
});

return {
  'up.sh': {
    mode: 0777,
    Formatter: IpRouteDevUpFormatter
  },
  'down.sh': {
    mode: 0777,
    Formatter: IpRouteDevDownFormatter
  }
};

};
