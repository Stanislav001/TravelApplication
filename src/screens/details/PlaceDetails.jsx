import { Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import AppBar from '../../components/Reusable/AppBar';
import reusable from '../../components/Reusable/reusable';
import { COLORS, TEXT, SIZES } from '../../constants/theme';
import { ScrollView, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { NetworkImage, PopularList, ReusableBtn, ReusableText, DescriptionText, HeightSpacer } from '../../components/index';

import { useGetPlace } from '../../hooks/usePlace';

const PlaceDetails = ({ navigation }) => {
    const route = useRoute();
    const id = route.params;
    const { data: place, isLoading: isLoadingPlace, error: placeError, } = useGetPlace(id);

    if (isLoadingPlace) {
        return <ActivityIndicator size={SIZES.xxLarge} color={COLORS.lightBlue} />
    }

    return (
        <ScrollView>
            <View>
                <NetworkImage source={place?.imageUrl} width={'100%'} height={350} borderRadius={30} />

                <AppBar
                    top={40}
                    left={20}
                    right={20}
                    icon={'search1'}
                    title={place?.title}
                    color={COLORS.white}
                    color1={COLORS.white}
                    onPress={() => navigation.goBack()}
                    onPress1={() => navigation.navigate('HotelSearch')}
                />
            </View>

            <View style={styles.description}>
                <ReusableText
                    family={'medium'}
                    size={TEXT.large}
                    color={COLORS.black}
                    text={place?.location} />

                <DescriptionText text={place?.description} />

                <View style={{ alignContent: 'center' }}>
                    <View style={reusable.rowWithSpace('space-between')}>
                        <ReusableText
                            family={'medium'}
                            size={TEXT.medium}
                            color={COLORS.black}
                            text={'Popular Hotels'} />

                        <TouchableOpacity onPress={() => { }}>
                            <Feather name='list' size={20} />
                        </TouchableOpacity>
                    </View>

                    <HeightSpacer height={10} />

                    <PopularList data={place?.popular} />

                    <ReusableBtn
                        borderWidth={0}
                        textColor={COLORS.white}
                        width={SIZES.width - 40}
                        borderColor={COLORS.green}
                        btnText={"Find Best Hotels"}
                        backgroundColor={COLORS.green}
                        onPress={() => navigation.navigate('HotelDetails', id)}
                    />

                    <HeightSpacer height={15} />
                </View>
            </View>
        </ScrollView>
    )
}

export default PlaceDetails;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        backgroundColor: '#F3F4F8',
    },
    description: {
        paddingTop: 20,
        marginHorizontal: 20,
    }
})