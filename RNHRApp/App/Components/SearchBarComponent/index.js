import React from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import PropTypes from "prop-types";
import { Container, Content, Item, Picker } from "native-base";
import styles from "./Styles";
import I18N_CONSTANTS from "../../I18n/LanguageConstants";
import { getText } from "../../I18n/Lang";
import { IMG_ICON_SEARCH } from "../../Assets/images";

const colors = require("../../Config/config");

const SearchBar = ({
  onClickHandler,
  onChange,
  onValueChange,
  onChangeSelectedValue,
  searchNameID,
}) => (
  <View style={styles.searchBarStyles}>
    <View style={styles.searchBarComponentStyles}>
      <View style={styles.searchTextContainer1}>
        <Container style={styles.transparentBackground}>
          <Content style={styles.selectHeight}>
            <Item
              picker
              style={{
                transform: [{ scaleX: 1 }, { scaleY: 1 }],
              }}
            >
              {Platform.OS === "android" ? (
                <Picker
                  mode="dropdown"
                  placeholder="Select"
                  placeholderStyle={styles.placeholderStyle}
                  placeholderIconColor={colors.white}
                  textStyle={styles.pickerStyle}
                  selectedValue={onChangeSelectedValue}
                  onValueChange={onValueChange}
                >
                  {/* <Picker.Item label="Select" color={colors.OTPText} /> */}
                  <Picker.Item
                    label="Emp Name"
                    value="key1"
                    color={colors.OTPText}
                  />
                  <Picker.Item
                    label="SAP Code"
                    value="key0"
                    color={colors.OTPText}
                  />
                </Picker>
              ) : (
                <Picker
                  mode="dropdown"
                  placeholder="Select"
                  placeholderStyle={styles.placeholderStyle}
                  placeholderIconColor={colors.white}
                  textStyle={styles.pickerStyle}
                  selectedValue={onChangeSelectedValue}
                  onValueChange={onValueChange}
                >
                  <Picker.Item
                    label="Emp Name"
                    value="key1"
                    color={colors.OTPText}
                  />
                  <Picker.Item
                    label="SAP Code"
                    value="key0"
                    color={colors.OTPText}
                  />
                </Picker>
              )}
            </Item>
          </Content>
        </Container>
      </View>
      <View style={styles.searchTextContainer}>
        <TextInput
          style={styles.txtInputSearchStyles}
          placeholderTextColor={colors.searchBarText}
          placeholder={
            onChangeSelectedValue !== "key0" && onChangeSelectedValue !== "key1"
              ? ""
              : onChangeSelectedValue === "key1"
                ? getText(I18N_CONSTANTS.WISHES.EMP_SEARCH)
                : getText(I18N_CONSTANTS.WISHES.SAP_SEARCH)
          }
          onChangeText={onChange}
          value={searchNameID}
        />
      </View>
      {onChangeSelectedValue === "key0" || onChangeSelectedValue === "key1" ? (
        <TouchableOpacity
          style={styles.imgSearchContainer}
          onPress={onClickHandler}
        >
          <Image source={IMG_ICON_SEARCH} style={styles.imgSearchStyles} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled
          style={[styles.imgSearchContainer, styles.disabled]}
          onPress={onClickHandler}
        >
          <Image source={IMG_ICON_SEARCH} style={styles.imgSearchStyles} />
        </TouchableOpacity>
      )}
      {/* <TouchableOpacity disabled style={styles.imgSearchContainer} onPress={onClickHandler}>
        <Image source={IMG_ICON_SEARCH} style={styles.imgSearchStyles} />
      </TouchableOpacity> */}
    </View>
  </View>
);

SearchBar.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onChangeSelectedValue: PropTypes.func.isRequired,
  searchNameID: PropTypes.func.isRequired,
};

export default SearchBar;
