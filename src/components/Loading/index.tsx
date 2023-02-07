import { View, ActivityIndicator } from 'react-native'
import { styles } from '../../globals/styles.global'

export function Loading() {
    return (
        <View style={{ flex: 1, backgroundColor: styles.colors.background, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={styles.colors.blue} />
        </View>
    )
}