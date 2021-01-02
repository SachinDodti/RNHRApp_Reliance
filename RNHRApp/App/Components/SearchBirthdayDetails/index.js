import React, { Component } from "react";
import { View, Text, Image, ScrollView, FlatList } from "react-native";
import { Divider } from "react-native-elements";
import PropTypes from "prop-types";
import { Collapse, CollapseHeader, CollapseBody } from "../Collapsible";
import styles from "./Styles";
import I18N_CONSTANTS from "../../I18n/LanguageConstants";
import { getText } from "../../I18n/Lang";
import SwitchComponent from "../SwitchComponent";
import { IMG_BDAY, IMG_WORKANNIVERSARY } from "../../Assets/images";
import ApplicationConfiguration from "../../Config/env";
import HrAppUtil from "../../Util/HrAppUtil";
import NoResultFound from "../NoResultFound";
import WishTemplate from "../WishTemplate";
import colors from "../../Config/config";

const IMG_DEFAULT_OPEN_ICON_WISHED =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAsCAYAAAD7Gp9tAAAE7klEQVRoQ+WbachuUxTHf9cUEhEfDIkomfJBppQM1zyPiYjMuUTILGSMjBmTMZIhmecp+UC+GJI5iQ+ia0iUuV/tV4/3Ps+719nnPOfZ773r67P2Pmv9zz5rr7X+65lD3bIEMA84Glgf+At4G7gOeKRG0+fUaFSyaQXgCWCbETbeApyUQK7GjVoBXRl4Gtg8g9QDwOE1gVojoKsArwAbBY/dk8ABwO9B/bGq1QboGsBrwDoNvX4B2Bf4teG6ztVrAnRd4EVgrUIvfRH7AD8Vru9kWS2Abgg8D6ze0iszgJ2BH1vuU7y8BkA3AV4CvIi6kA+A7YHvutis6R6TBnQLwPi3fMDwm4ANgO0Cup8AOwBfB3Q7VZkkoJ6ix4HlAh5dCZwFLJUS+j0Daz4HdgE+C+h2pjIpQHdLwCwT8ORs4IoBPUG9Bzg4sPabdFI/Duh2ojIJQPcDHgSWDHhwMnDjEL3FgTuAIwJ7fJ9i6vsB3dYqfQN6KHAvsFjG8r+B4xJoo1S13bh6QgAFb30//7cCuq1U+gRUxwUg98w/08m7P+iZ4eDMgO7PwN6pcAiol6nknCvbdcFVpwFXBzb7I5WRNkWayLnAJYEFv6WKypx3LNIHoOcDFwes11lPkNVSiZwKXBNYWPrSAlvnP7/QJiOUfFmXN/gc9wJeb/NA4PgUViIx2i5VNKyEzRrXCXXfm5ODOWPmA6ZRXV0YTS4+4/rtOQOb/D4OQE1p7kx9ypwt40ppbJI8FEzNTgGuzxka/b1rQE267wMOChhg0m0Z+WlAt0RlV+BRIFI8nJPCU8lz/remS0CXTqciWhbuBHzR2oOZN7C8fSzYK5gqb1uZ1BWgywJPBRsXHwE79ti4aNqAkaf6pxTVLgCVTHsW2CpghOWfXaC+W2sbJ1ol0iI0/h9bylO1BVT+RzA3DYBp89fPfFIddWloc9xIE1vy78gSnqoNoKumXmaETHs10ROWf5MUaRb7r2sHjCgi/0oBbUKmPQfsXwOBlkDUdl+w4ObkZcCCI0z+lQCqIRqkYTmxgWwKVQXFO2BsE6r6DcDMJRSqmgJqcPfErZZDEqhuCGGazSul+J8bpnCZ8X93wEJkRmkCqBePYEZuylvTTJKzSDVLbtxn0PYQ+RcFdMtE80bItGsB23XFuVzPb8Ac2tA0N/BceaptZ8qhI4BabZi0R0q4S4HzAobVptKE/PsyFSZDyb8coN5w8j8RMKeTabWBlrNHjutu4JCcImAfwpz6w+m6MwF6YOoXRsi0E1O7LmBL1Sp2ym4DjgpY6QVl1ffeoO4oQA9LbyvSqHUY9q6AAbNFRUxs51nT58RCxZP6Xy93GKA2XW0O50Qqwa63IWFhlCj590uibhzBXICBlD0cHCoYBZSJuiGhKZk224B3WkUaJyfyYc6oPjN4Qi8CLsitBFy8R+reBNRnvYrDFpGOvl/s3ClArwJOD7huzJD/eTOguzCpHANYrOTulHcE1OB7Q8B7bzXLL8uwRVEk/5ypMhMYKQJqTpWrzb9NyWwv80EVvy3zcv/OMyqVnC+guRJRwC23eh0LrBhU6RtL1WHFzmUCKsez3ggHrF0tPb+q2MFJmLZ16qatmR7uoZTfnyegNn+H/SvN7opUbO9TwJNAqOCZfvabASsC707hNHXLOxhwIeC8uzf5w8AZwA8FD1qkl/wL/PPcq587kPwAAAAASUVORK5CYII=";
const IMG_DEFAULT_CLOSED_ICON_WISHED =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAsCAYAAAD7Gp9tAAAFLklEQVRoQ+2bV6gdVRSGv0QTjIhBMQ9GEUUh2PBBbAhiid3YDaIkKHaMoqjYRcWKYsWKWFHEKGJviQXxQfHFgtgR0QdRYkEU7HzXfcLhcs7sNXPmnJl7b9bL5TL/7L3WP3vtvco+0/hfDgYuBbYBfgGWAucAP6bnq/4EGZgGHAY83gP/IbAv8E1wrKkGmwFsB6wDvNfhSUI/Bub1YeMLYHfg66nGVsbenYFHgI0S7l/gbmCJhPpPkXwL7Ap8vorUMQb2BJ4CZvXg4yoJlbC5GbK+SwN9MMVJPTBtj7p7L1khoacBtwSI+gHYH3gngJ2MkKOBB4DVioyTUOU64OwAC0YA+wFvBbCTCXICcCcwPWPUux1CxV0GXBJg4XfgAODVAHYyQE4Hbg4Y8icwv5tQ3zkXuCbw8h/AEcDTAexEhpwHXB0wwEV2OPD8eEJ99xTg9sAgfpHFwKMB7ESEuLBcYDn5FTio47G9CHWARcD9gT3jH+B44L7crBPouZzo4h7WOfFM2Qt4uwPsR6jPdemHgX4hQvdkpwZXdU7Bpp97gt8FHBdQxKhnD+D9bmwRoeKMu3TpXkHs+DnPD+6/AV0bgbhw9MqjArMbu7syPxqPzREq3tTz2SCpVwIXBRRqG2RmCtgXBBT7KiU5PTPHCKHOsSPwErB2YMIbgbMCKW1gqJFA1kyp5PzAbNY2TMP7FoyihDrXtsCLwHqBiQ2ClwB/B7BNQman0G+XgBJW3/TW74uwZQh1nK0TqbncX6zVGMOqtpK6LvACsH2ATNNt024PokIpS6iDbQa8BmyYGzy50kLARKBNMifFjVsFlHoTcG/9OYClCqGOK5mvA5sGJnGbsIj9WwA7Coi6uyBcGDlZniKdsO5VCVWR9YGXgchX1gDbLAbCTYokqvMmASWeSelkKe8ahFB10nXchzywcuI+ZOwWcp3cYBWebw68AmwQeNf9/9gqW9WghKqbJ6Wk7hRQ1AK12UXhSRkYpyzEw9TqWCRCuRc4sephWgehGmcsZ/C/W8BSe1i2EUbV/NshuXkkhr4t5fC5tlBfM+si1AnWAB5LJ2KOVwNk3f/LHHDA58aNTwYTkmsBy3UDSZ2Eqogp3EOAoVJOzIdd0Z/lgBWf2wJ/IpgyXxCse2ZVqZtQJ7Ri4z5kUJ8TA2VXUd3NPyMKvSVSKTsjWJHP2TL2fBiEdsa1SH1yQIsVqU+1sqYYeKcIYjPtwWAt12K6/fTaZFiEdki1fRCpehufWip8Y0DL/IAeLLlmmoVxPch6b60yTEI7il4MXB7Q2r6MrQRjxSpyJnBD4EVbN/Z/htIPGwWh2mg57/ohGnshcEVgfD/aIakUGYCXh4yKUDVzv9Idc3P+BRxTwh2jzTS3FT3AGsTQJGdc3ROXOTBOAu4pUEDd/UB+qJz8BOzT3UzLvVD1+agJVc9DU58qEtJ4yeDWHsYZmkm2KzknwwrNes7bBKEq4nUe76RWaf6ZPHjH6Mgck+kinLWDTwLYWiBNEaryBvReC1wrYEknLSzTTDO91c1Heg2zSULlsWzhYotgAebTVNUaVQFm5ZpomlAV8V7/smBpLbCYCTXTIgNVwbSBUPXeMsWGkeJvkZ0WsfcGPNUbkbYQqvG2J8ySNq7IhPGlRZGmOgJjareJUPUp0/zr5t0+kRlQuJlW8aNlX2sboSpcpsUrvlIzLctMRUAbCdUUez/PBS4htO4yRVsJldTcNZk7Uv+nVTdT2kyopK6e7kh5qdc2sOR5kt/U59d/FR21vtf+A1Sa3Ksn95+hAAAAAElFTkSuQmCC";
const IMG_DEFAULT_OPEN_ICON =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAgCAYAAACrdt7+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAHD2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA2LTI0VDE0OjI3OjQwKzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA2LTI0VDE0OjI3OjQwKzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNi0yNFQxNDoyNzo0MCswNTozMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxOGU1NTEwMS1lZmZlLWY1NGYtYTE4NS1hYWYwNDY4N2RhMTgiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjNDM4NjRkZS1jYjczLTU5NDUtYWVlMy1lMTViMWUwYTE5NWQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3OTViZjJkNy0wODA2LWQ5NDItYmQ0NC00NmU0MzliMzljNzMiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3OTViZjJkNy0wODA2LWQ5NDItYmQ0NC00NmU0MzliMzljNzMiIHN0RXZ0OndoZW49IjIwMTktMDYtMjRUMTQ6Mjc6NDArMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MThlNTUxMDEtZWZmZS1mNTRmLWExODUtYWFmMDQ2ODdkYTE4IiBzdEV2dDp3aGVuPSIyMDE5LTA2LTI0VDE0OjI3OjQwKzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6MTE3NmU2MGMtODNkMi0xYzRlLThhYzQtOWE0MGY4MDA4N2JhPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDoyN0E5N0NBMEMwQThFNzExOUMwNkMwQjEyMkZGQUFDQzwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6NkJBMkU3NzE5QjZDRTkxMUEzNzJGMjQ4N0M0ODg5NDA8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOkVFOTdERTM5Nzg3RTExRTk5NTIzOTZGM0M3MkQxMTFGPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+WjEkYwAAAjlJREFUaIHVmTFrFEEYhp/LoaBgioBFmqvELilMJ2IlqCB6VYr8gyDYnK3/wHRqsFWwUMRYCAdWoo1FmnRip0UiWKmcpDgei92ALHe7t3O7O3svvM3tzDffvOzwHDuoRHRXva9+NdEf9ZV6MVZPHZVIWgZeAtcnPPsNbALDRjsClppeMFUP+MTkMADOAe+A7cY6ShUjkA3gM7BWMG4JeALsAN26mzpR00emD7wAzpSc9xbYAkZVN5RVk2/IAHhN+TAA7gAfgdVKO5qgJgLpArvAw5z1joDLwPOcOpdIjtp6pd1lVTPGltWh+TpQe+n4jvqgYPwv9UZdPdcZRi/dbJ6GJqFl526pxznzxur2IgWyoR4WhLFr8sdsWo0r6s+CGjsFNVoRSF8d5WxirA5mrHVB/VIQyp56tq2BDNINT9PIJLAyNVfUDwWh7KurbQqka3IE8nRocpRC6p9WnxXU/6autyGQsiQJdSMEmjeMeUgS6loJNE9jVZAk1LURKLShvtWRJNS1ECikkTpIEurKCVRm8bpJEupKCTTrok2RJNSVEWiWxWKQJNRzE6hogZgkCfVcBMor3Dc+SUIdTKBpBdtEklAHEShbpK0kCXVpAv0/ue0kCXUpAp1MWiSShHoWAm2irrl4JAl1EYF+YP6b0WaShDqPQMcdddpN1V+Sy6G9Wj/7x9EK8Aa4mvn9UUd9D1zLPDgCbgH7DTQXS6eAe8BNYExyO/i0o54HHgO3SS6ShsBd4HukRqPqHwQK79FAzLZ4AAAAAElFTkSuQmCC";
const IMG_DEFAULT_CLOSED_ICON =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAgCAYAAACrdt7+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAHD2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA2LTI0VDE0OjI4OjMwKzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA2LTI0VDE0OjI4OjMwKzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNi0yNFQxNDoyODozMCswNTozMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxZTgyZTkxNC04OGIzLWQwNDgtODJjYy04YTg1NGY2ZGQ4NjIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjODQ0MDIyZS1lYTc2LTAwNDItYTcyNy0zMTk5OTI0NzFlYTYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MmMwMjk0YS01MDU2LWJkNDYtODc1NC0xZGY1MTFlMjE5NmUiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MmMwMjk0YS01MDU2LWJkNDYtODc1NC0xZGY1MTFlMjE5NmUiIHN0RXZ0OndoZW49IjIwMTktMDYtMjRUMTQ6Mjg6MzArMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MWU4MmU5MTQtODhiMy1kMDQ4LTgyY2MtOGE4NTRmNmRkODYyIiBzdEV2dDp3aGVuPSIyMDE5LTA2LTI0VDE0OjI4OjMwKzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6MTE3NmU2MGMtODNkMi0xYzRlLThhYzQtOWE0MGY4MDA4N2JhPC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDoyN0E5N0NBMEMwQThFNzExOUMwNkMwQjEyMkZGQUFDQzwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6NkJBMkU3NzE5QjZDRTkxMUEzNzJGMjQ4N0M0ODg5NDA8L3JkZjpsaT4gPHJkZjpsaT54bXAuZGlkOkVFOTdERTM5Nzg3RTExRTk5NTIzOTZGM0M3MkQxMTFGPC9yZGY6bGk+IDwvcmRmOkJhZz4gPC9waG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2GNhLwAAAjFJREFUaIHlmjFrFFEYRc8aFLTYImBhk8o2NrER1EpQUWRBSJF/IIrNYukfELRSgq2FhQhuwCJg5Q+IRTrBKharYBUxkmI9FrMDy5J5Ozv75s1EL3zN7Hxvvnv3Dad401HPAi+AO8AJYBu4D3zlP1RH/QBcm7r+DbgN7KQfKZlOAg+Bm8AI2AJedlQLGn4DG8AgyXhptQy8A65OXX+OumuxRmpf5R+q8+rnAr+HqKvqMBCK6qa61AIzi9Zl9UfA5/f8xhXDO0V1W+22wFTV2lAPA/5G6vpkQ3dsOqRds/CaNjdPddTHM3ztqzdUppuXzF6PkIbqWguMlqlT6qsZfvbUC3lP0UJ9sy1UpAO11wLDoVpWP84IY0c9N9kXWrA3Nl6kNhMoRJJcA/XMdO+shdc8fgSaRRLVp0Uzl3nAcSJQGZLcC61R9kFtJ9BcJIkRCLaXQHOTJFYgebWJQJVIEjsQbAeBKpOkjkCwWQItRJK6AsFmCLQwSeoMBNMRKBpJ6g4E6ydQVJKkCCSvOggUnSQpA8G4BKqFJKkDwTgEqo0kTQSCixGoVpI0FQjOT6AkJGkyECxPoEsmIkmoOlp0LBNdfeAJ2elgFX0iOzwbRpvoCKUMBKAHvAZOz9m3RXZodhB7oGlV/beqagBcITsqLatnwF0ShAHpd0iuFeA9sBq45w/wANhMMtFYTQUC0AXeANeP+O0nsE72JUJSpX5lJrUP3AIeAV/G134Bb4GLNBAGwF8MtwbYeaZehgAAAABJRU5ErkJggg==";

class TodayBirthdayDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayDate: ""
    };
    this.sendWish = this.sendWish.bind(this);
    this.sendWishAnn = this.sendWishAnn.bind(this);
    this.onPaneExpand = this.onPaneExpand.bind(this);
    this.showWishTemplate = this.showWishTemplate.bind(this);
  }

  componentDidMount() {
    const that = this;
    const date = new Date().getDate(); // Current Date
    const month = new Date().getMonth() + 1; // Current Month
    const year = new Date().getFullYear(); // Current Year
    const hours = new Date().getHours(); // Current Hours
    const min = new Date().getMinutes(); // Current Minutes
    const sec = new Date().getSeconds(); // Current Seconds
    const todayDateFormat = `${year}-${month}-${date} ${hours}:${min}:${sec}`;
    that.setState({
      // Setting the value of the date time
      todayDate: HrAppUtil.getDateString(
        HrAppUtil.getDate(
          todayDateFormat,
          ApplicationConfiguration.dateFormat.RESPONSE_TIME_FORMAT
        ),
        ApplicationConfiguration.dateFormat.DEFAUL_FORMAT
      )
    });
  }

  showWishTemplate(wishType, employee, isBday) {
    const { showWishTemplateView } = this.props;
    showWishTemplateView(wishType, employee, isBday);
  }

  onPaneExpand(isExpanded, refId) {
    const newStateValue = {};
    newStateValue[refId] = isExpanded;
    // console.log('>>>>> On Toggle : ', isExpanded, refId);
    this.setState(newStateValue);
  }

  getRefId = item => `S${item.sapCode}`;

  sendWish(employee, option) {
    const { sendWishMessage } = this.props;
    const bday = true;
    sendWishMessage(employee, option, bday);
  }

  sendWishAnn(employee, option) {
    const { sendWishMessage } = this.props;
    const bday = false;
    sendWishMessage(employee, option, bday);
  }

  renderBirthdaySearch = ({ item }) => {
    const { wishedSapCode } = this.props;
    const isWished = HrAppUtil.hasAlreadyWished(wishedSapCode, item.sapCode);
    return (
      <View>
        <Collapse
          isCollapsed={this.state[this.getRefId(item)]}
          refId={this.getRefId(item)}
          onToggle={this.onPaneExpand}
          showIcons
          iconBackgroundColor={[isWished ? colors.gray : null]}
          openIcon={
            isWished ? IMG_DEFAULT_OPEN_ICON_WISHED : IMG_DEFAULT_OPEN_ICON
          }
          closedIcon={
            isWished ? IMG_DEFAULT_CLOSED_ICON_WISHED : IMG_DEFAULT_CLOSED_ICON
          }
        >
          <CollapseHeader>
            <View style={[isWished ? styles.wishedBackgroundColor : null]}>
              <View style={styles.listView}>
                <View style={styles.columnL}>
                  <Text
                    style={[isWished ? styles.textIdWished : styles.textId]}
                  >
                    {item.sapCode}
                  </Text>
                </View>
                <View style={styles.columnR}>
                  <Text
                    style={[isWished ? styles.nameTextWished : styles.nameText]}
                  >
                    {item.name}
                  </Text>
                </View>
                {/* <View style={styles.dropdownImgView}>
              <Image
                style={[styles.dropdownImgPos, { transform:
                  [{ rotate: this.state[this.getRefId(item)] ? '-90deg' : '0deg' }] }]}
                source={IMG_ICON_DATE_DROPDOWN}
              />
            </View> */}
              </View>
              {this.state[this.getRefId(item)] ? (
                <View style={styles.headerDetail}>
                  <View style={styles.columnL}>
                    <Text
                      style={[isWished ? styles.textIdWished : styles.textId]}
                    >
                      {item.channel}
                    </Text>
                  </View>
                  <View style={styles.columnR}>
                    <Text
                      style={[
                        isWished ? styles.nameTextWished : styles.nameText
                      ]}
                    >
                      {item.paLocation}
                    </Text>
                  </View>
                  {/* <View style={styles.dropdownImgView}>
                  <Image
                    style={[styles.dropdownImgPos, { transform:
                      [{ rotate: this.state[this.getRefId(item)]
                      ? '-90deg' : '0deg' }] }]}
                    source={IMG_ICON_DATE_DROPDOWN}
                  />
                </View> */}
                </View>
              ) : null}
            </View>
          </CollapseHeader>
          <CollapseBody>
            <View style={styles.DropDownViewBday}>
              <View style={styles.bdayImgView}>
                <Image style={[styles.bdayImgPos]} source={IMG_BDAY} />
              </View>
              <View style={styles.columnBdayAnn}>
                <Text style={styles.bdayAnnTextId}>
                  {HrAppUtil.getDateString(
                    HrAppUtil.getDate(
                      item.dateOfBirth,
                      ApplicationConfiguration.dateFormat.DEFAUL_FORMAT
                    ),
                    ApplicationConfiguration.dateFormat.ATTENDANCE_FORMAT
                  )}
                </Text>
              </View>
            </View>
            {HrAppUtil.getDateString(
              HrAppUtil.getDate(
                this.state.todayDate,
                ApplicationConfiguration.dateFormat.DEFAUL_FORMAT
              ),
              ApplicationConfiguration.dateFormat.ATTENDANCE_FORMAT
            ) ===
            HrAppUtil.getDateString(
              HrAppUtil.getDate(
                item.dateOfBirth,
                ApplicationConfiguration.dateFormat.DEFAUL_FORMAT
              ),
              ApplicationConfiguration.dateFormat.ATTENDANCE_FORMAT
            ) ? (
              <SwitchComponent
                employee={item}
                sendWishHandler={this.sendWish}
                showWishTemplate={(showWishTemplate, employee) =>
                  this.showWishTemplate(showWishTemplate, employee, true)
                }
              />
            ) : null}
            {/* <SwitchComponent employee={item} sendWishHandler={this.sendWish} /> */}
            <View style={styles.DropDownViewAnniversary}>
              <View style={styles.bdayImgView}>
                <Image
                  style={[styles.anniversaryImgPos]}
                  source={IMG_WORKANNIVERSARY}
                />
              </View>
              <View style={styles.columnBdayAnn}>
                <Text style={styles.bdayAnnTextId}>
                  {HrAppUtil.getDateString(
                    HrAppUtil.getDate(
                      item.dateOfJoining,
                      ApplicationConfiguration.dateFormat.DEFAUL_FORMAT
                    ),
                    ApplicationConfiguration.dateFormat.DETAIL_FORMAT
                  )}
                </Text>
              </View>
            </View>
            {HrAppUtil.getDateString(
              HrAppUtil.getDate(
                this.state.todayDate,
                ApplicationConfiguration.dateFormat.DEFAUL_FORMAT
              ),
              ApplicationConfiguration.dateFormat.ATTENDANCE_FORMAT
            ) ===
            HrAppUtil.getDateString(
              HrAppUtil.getDate(
                item.dateOfJoining,
                ApplicationConfiguration.dateFormat.DEFAUL_FORMAT
              ),
              ApplicationConfiguration.dateFormat.ATTENDANCE_FORMAT
            ) ? (
              <SwitchComponent
                employee={item}
                sendWishHandler={this.sendWishAnn}
                showWishTemplate={(showWishTemplate, employee) =>
                  this.showWishTemplate(showWishTemplate, employee, false)
                }
              />
            ) : null}
            {/* <SwitchComponent employee={item} sendWishHandler={this.sendWish} /> */}
          </CollapseBody>
        </Collapse>
      </View>
    );
  };

  render() {
    const {
      birthdayArray,
      showWish,
      wishType,
      templateText,
      closeTemplate,
      employee,
      loggedInUser,
      localStore
    } = this.props;
    // console.log("searchBddd", birthdayArray);
    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewParent}
        indicatorStyle="white"
      >
        <View style={styles.headingContainer}>
          <View style={styles.textView}>
            <Text style={styles.textHeader}>
              {getText(I18N_CONSTANTS.WISHES.BIRTHDAY_SEARCH)}
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollViewButtom}
          indicatorStyle="white"
        >
          <WishTemplate
            show={showWish}
            wishType={wishType}
            templateText={templateText}
            onClosePopUp={closeTemplate}
            employee={employee}
            loggedInUser={loggedInUser}
          />
          {birthdayArray.length > 0 ? (
            <FlatList
              extraData={this.state}
              data={birthdayArray}
              renderItem={this.renderBirthdaySearch}
              // ItemSeparatorComponent={this.renderSeparator}
              ItemSeparatorComponent={Divider}
            />
          ) : (
            <NoResultFound />
          )}
        </ScrollView>
      </ScrollView>
    );
  }
}

TodayBirthdayDetails.propTypes = {
  birthdayArray: PropTypes.objectOf(PropTypes.object).isRequired,
  sendWishMessage: PropTypes.objectOf(PropTypes.object).isRequired
};

export default TodayBirthdayDetails;
